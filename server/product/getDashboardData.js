const moment = require('moment-timezone')

const { fiveMinutesMillis } = require('../config/')

const { getCurrentWeather } = require('../processes/')

const {
  catchErrorsWithMessage,
  getMaxTimeStamp,
} = require('../utils/')

const {
  readTableRows,
  readTableRowsWhereBtw,
} = require('../db/')

const getDashboardData = async (req, res) => {

  const { id } = req.params

  let interval, timeout

  console.log('Running get dashboard at', Date.now() )

  const [project] = await catchErrorsWithMessage(`There was an error getting project data for project ${id}`, readTableRows)('project', {id,})

  const {
    nodeId,
    // charge,
    // revenue,
  } = project

  const mostRecent = await getMaxTimeStamp(nodeId)

  const start = moment().valueOf()

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
    nodeId,
  } = projectSpecs

  const now = moment()
  const endMillis = now.valueOf()
  const startMillis = now.clone()
    .subtract(1, 'hour')
    .valueOf()

  console.log('refreshing dashboard data at', endMillis)

  const data = await Promise.all([
      getCurrentWeather(lat, lng),
      readTableRowsWhereBtw('price_with_score', {nodeId,}, 'timestamp', [startMillis, endMillis]),
      readTableRows('project', {id,})
    ].map( p => p.catch(handleMultiPromiseError) )
  )

  const [weather, prices, [project]] = data

  return res.sseSend({
    weather,
    prices,
    revenue: project.revenue,
    charge: project.charge,
    status: project.status,
  })
}

const handleMultiPromiseError = err => {
  console.error(`there was an error: ${err}`)
  return { error: `there was an error: ${err}`}
}

module.exports = getDashboardData
