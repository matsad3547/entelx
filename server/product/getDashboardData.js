const moment = require('moment-timezone')

const { fiveMinutesMillis } = require('../config/')

const { getCurrentWeather } = require('../processes/')

const { catchErrorsWithMessage } = require('../utils/')

const {
  readTableRows,
  readTableRowsWhereBtw,
  findMax,
} = require('../db/')

const getDashboardData = async (req, res) => {

  const { id } = req.params

  let interval, timeout

  console.log('Running get dashboard at', Date.now() )

  const [project] = await catchErrorsWithMessage(`There was an error getting project data for project ${id}`, readTableRows)('project', {id,})

  const {
    nodeId,
    timeZone,
    charge,
    revenue,
  } = project

  const maxRes = await catchErrorsWithMessage(`There was an error finding the max timestamp associated with node ${nodeId}`, findMax)('price', 'timestamp', {nodeId,})

  const mostRecent = maxRes[0]['max(timestamp)']

  const start = moment().tz(timeZone).valueOf()

  const firstUpdate = fiveMinutesMillis - (start - mostRecent) + (2 * 1000)

  res.sseSetup()

  await getData(res, project)

  timeout = setTimeout( async () => {

    await getData(res, project)

    interval = setInterval( () => getData(res, project), fiveMinutesMillis)
  }, firstUpdate)

  req.on('close', () => {
    console.log('Closing dashboard data connection')
    clearInterval(interval)
    clearTimeout(timeout)
    res.sseClose()
  })
}

const getData = async (res, projectSpecs) => {

  const {
    id,
    lat,
    lng,
    timeZone,
    nodeId,
  } = projectSpecs

  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
    .subtract(1, 'hour')
    .valueOf()

  console.log('refreshing dashboard data at', endMillis)

  const data = await Promise.all([
      getCurrentWeather(lat, lng),
      readTableRowsWhereBtw('price', {nodeId,}, 'timestamp', [startMillis, endMillis]),
      readTableRows('project', {id,})
    ].map( p => p.catch(handleMultiPromiseError) )
  )

  const [weather, prices, [project]] = data

  return res.sseSend({
    weather,
    prices,
    revenue: project.revenue,
    charge: project.charge,
  })
}

const handleMultiPromiseError = err => {
  console.error(`there was an error: ${err}`)
  return { error: `there was an error: ${err}`}
}

module.exports = getDashboardData
