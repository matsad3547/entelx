( async () => {

  const moment = require('moment-timezone')

  const {
    setExitListeners,
    getUpdateTimeout,
    catchErrorsWithMessage,
  } = require('../../utils/')

  const {
    fiveMinutesMillis,
    sixMonthMillis,
    oneMinuteMillis,
  } = require('../../config/')

  const {
    getFiveMinutesFromNow,
    getOneMinuteAgo,
    getMaxTimeStamp,
  } = require('./utils/')

  const {
    readTableRows,
    updateTableRow,
    deleteTableRowsWhereBtw,
  } = require('../../db/')

  const presentPriceDataUpdater = require('./presentPriceDataUpdater')

  const args = JSON.parse(process.argv[2])

  const {
    node,
    projectId,
  } = args

  const {
    id,
    name,
  } = node

  let mostRecent = getMaxTimeStamp(id)

  let firstUpdateTimeout, continuousTimeout, firstUpdate

  const [nodeData] = await readTableRows('node', {id,})

  firstUpdate = getUpdateTimeout(mostRecent)

  const pid = process.pid

  firstUpdateTimeout = setTimeout( async () => {
    let now = moment()

    console.log(`starting price data update at ${now.valueOf()}`)

    let endMillis = getFiveMinutesFromNow(now)
    let startMillis = getOneMinuteAgo(now)

    const [project] = await readTableRows('project', {id: projectId})

    const newest = await catchErrorsWithMessage('There was an error getting the initial price update', presentPriceDataUpdater)(startMillis, endMillis, nodeData, project)

    let nextTimeoutMillis = getUpdateTimeout(newest)

    const getPriceDataOnInterval = (timeoutMillis = fiveMinutesMillis) => {
      continuousTimeout = setTimeout( async () => {

        now = moment()

        endMillis = getFiveMinutesFromNow(now)

console.log('using most recent as start');
        startMillis = getMaxTimeStamp(id) - oneMinuteMillis
        // startMillis = getOneMinuteAgo(now)

        const [project] = await readTableRows('project', {id: projectId})

        console.log(`periodic price data update at ${now.valueOf()}`)

        const newest = await catchErrorsWithMessage('There was an error getting periodic price updates', presentPriceDataUpdater)(startMillis, endMillis, nodeData, project)

        nextTimeoutMillis = getUpdateTimeout(newest)

        await catchErrorsWithMessage('There was an error deleting data older than 6 months', deleteTableRowsWhereBtw)('price', {nodeId: id}, 'timestamp', [0, newest - sixMonthMillis])

        getPriceDataOnInterval(nextTimeoutMillis)

      }, timeoutMillis)
    }

    getPriceDataOnInterval(nextTimeoutMillis)
  }, firstUpdate)


  await catchErrorsWithMessage('There was an error setting the process id for present price updates', updateTableRow)('project', {id: projectId}, {presentUpdatePid: pid})

  setExitListeners()

  //Ignore SIGUSR2 from nodemon restart
  process.on('SIGUSR2', () => true )

  const cleanUp = code => {
    console.log(`exiting "updatePresentPriceData" for ${name}\n exit code: ${code}` )
    clearTimeout(firstUpdateTimeout)
    clearTimeout(continuousTimeout)
  }

  process.on('exit', cleanUp)
})()
