const moment = require('moment-timezone')

const { fiveMinutes } = require('../config/')

const { getCurrentWeather } = require('../processes/')

const {
  readTableRows,
  readTableRowsWhereBtw,
  findMax,
} = require('../db/')

const getDashboardData = (req, res) => {

  const { id } = req.params

  let int, timeout

  console.log('Running get dashboard at', Date.now() );

  return readTableRows('project', {id,})
    .then( projectRes => {

      const project = projectRes[0]

      const {
        nodeId,
        timeZone,
      } = project

      return findMax(
        'price',
        'timestamp',
        {nodeId,}
      )
      .then( maxRes => {
        const mostRecent = maxRes[0]['max(timestamp)']

        const start = moment().tz(timeZone).valueOf()

        const firstUpdate = fiveMinutes - (start - mostRecent) + (5 * 1000)

        res.sseSetup()

        return getData(res, project)
          .then( () => {
            timeout = setTimeout( () => getData(res, project)
              .then( () => {
                int = setInterval( () => getData(res, project), fiveMinutes)
              }), firstUpdate)
          })
      })
    })

  req.on('close', () => {
    console.log('Closing dashboard data connection')
    int && clearInterval(int)
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
