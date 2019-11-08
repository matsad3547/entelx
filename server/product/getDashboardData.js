const moment = require('moment-timezone')

const { fiveMinutesMillis } = require('../config/')

const { getCurrentWeather } = require('../processes/')

const {
  readTableRows,
  readTableRowsWhereBtw,
  findMax,
} = require('../db/')

const {
  catchErrorsWithMessage,
  handleMultiPromiseError,
  getDBDatetime,
} = require('../utils/')

const getDashboardData = async (req, res) => {

  const { id } = req.params

  let interval, timeout

  console.log('Opening dashboard data connection at', moment().format() )

  const [project] = await catchErrorsWithMessage(`There was an error getting project data for project ${id}`, readTableRows)('project', {id,})

  const {
    nodeId,
  } = project

  const max = await catchErrorsWithMessage(`There was an error finding the max timestamp associated with node ${nodeId}`, findMax)('price', 'timestamp', {nodeId,})

  const mostRecent = max[0]['max(timestamp)']

  const mostRecentUnix = moment(mostRecent).valueOf()

  const start = moment().valueOf()

  const firstUpdate = fiveMinutesMillis - (start - mostRecentUnix) + (2 * 1000)

  res.sseSetup()

  await catchErrorsWithMessage('There was an error getting initial dashboard data', getData)(res, project)

  timeout = setTimeout( async () => {

    await catchErrorsWithMessage('There was an error getting dashboard data', getData)(res, project)

    interval = setInterval( async () => await catchErrorsWithMessage('There was an error getting dashboard data', getData)(res, project), fiveMinutesMillis)
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
  const end = now.toISOString()
  const start = now.clone()
    .subtract(1, 'hour')
    .toISOString()

  console.log('Refreshing dashboard data at', now.format())

  const datetimes = [start, end].map( iso => getDBDatetime(iso))

  const data = await Promise.all([
      getCurrentWeather(lat, lng),
      readTableRowsWhereBtw('price_with_score', {nodeId,}, 'timestamp', datetimes),
    ].map( p => p.catch(handleMultiPromiseError) )
  )

  const [weather, prices] = data

  const [project] = await readTableRows('project', {id,})

  return res.sseSend({
    weather,
    prices,
    revenue: project.revenue,
    charge: project.charge,
    status: project.status,
    chargeThreshold: project.chargeThreshold,
    dischargeThreshold: project.dischargeThreshold,
  })
}

module.exports = getDashboardData
