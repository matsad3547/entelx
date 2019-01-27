const moment = require('moment-timezone')

const { fiveMinutesMillis } = require('../config/')

const { getCurrentWeather } = require('../processes/')

const {
  readTableRows,
  readTableRowsWhereBtw,
  findMax,
} = require('../db/')

const getDashboardData = async (req, res) => {

  const { id } = req.params

  let interval, timeout

  console.log('Running get dashboard at', Date.now() )

  const [project] = await readTableRows('project', {id,})

  const {
    nodeId,
    timeZone,
  } = project

  const maxRes = await findMax('price', 'timestamp', {nodeId,})

  const mostRecent = maxRes[0]['max(timestamp)']

  const start = moment().tz(timeZone).valueOf()

  const firstUpdate = fiveMinutesMillis - (start - mostRecent) + (5 * 1000)

  res.sseSetup()

  await getData(res, project)

  timeout = setTimeout( async () => {

    await getData(res, project)

    interval = setInterval( () => getData(res, project), fiveMinutesMillis)
  }, firstUpdate)

  req.on('close', () => {
    console.log('Closing dashboard data connection')
    interval && clearInterval(interval)
    timeout && clearTimeout(timeout)
    res.sseClose()
  })
}

const getData = (res, project) => {

  const {
    lat,
    lng,
    timeZone,
    nodeId,
  } = project

  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
    .subtract(1, 'hour')
    .valueOf()

  console.log('refreshing dashboard data at', endMillis)

  return Promise.all([
      getCurrentWeather(lat, lng),
      readTableRowsWhereBtw(
        'price',
        {nodeId,},
        'timestamp',
        [startMillis, endMillis],
      )
    ]
    .map( p => p.catch(handleMultiPromiseError) )
  )
  .then( data => {

    return res.sseSend({
      weather: data[0],
      prices: data[1],
    })
  })
}

const handleMultiPromiseError = err => {
  console.error(`there was an error: ${err}`)
  return { error: `there was an error: ${err}`}
}

module.exports = getDashboardData
