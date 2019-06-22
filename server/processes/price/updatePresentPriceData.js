( async () => {

  const moment = require('moment-timezone')

  const {
    setExitListeners,
    getUpdateTimeout,
    catchErrorsWithMessage,
    catchErrorAndRestart,
  } = require('../../utils/')

  const {
    fiveMinutesMillis,
    sixMonthMillis,
    oneMinuteMillis,
  } = require('../../config/')

  const {
    getFiveMinutesFromNow,
    getOneMinuteAgo,
  } = require('./utils/')

  const {
    readTableRows,
    updateTableRow,
    deleteTableRowsWhereBtw,
    findMax,
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

  const max = await findMax('price', 'timestamp', {nodeId: id})

  const mostRecent = max[0]['max(timestamp)']

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
        startMillis = getOneMinuteAgo(now)

        const [project] = await readTableRows('project', {id: projectId})

        console.log(`periodic price data update at ${now.valueOf()}`)

        const newest = await catchErrorsWithMessage('There was an error getting periodic price updates', presentPriceDataUpdater)(startMillis, endMillis, nodeData, project)

        // const newest = await catchErrorAndRestart('There was an error getting continuous price updates', presentPriceDataUpdater, getPriceDataOnIntervalRestart)(startMillis, endMillis, nodeData, project)

        nextTimeoutMillis = getUpdateTimeout(newest)

        await catchErrorsWithMessage('There was an error deleting data older than 6 months', deleteTableRowsWhereBtw)('price', {nodeId: id}, 'timestamp', [0, newest - sixMonthMillis])

        getPriceDataOnInterval(nextTimeoutMillis)

      }, timeoutMillis)
    }

    // const getPriceDataOnIntervalRestart = (nextTimeoutMillis) => setTimeout( () => {
    //   console.log('restarting presentPriceDataUpdates...')
    //
    //   getPriceDataOnInterval(nextTimeoutMillis - oneMinuteMillis)
    // }, oneMinuteMillis)

    getPriceDataOnInterval(nextTimeoutMillis)
  }, firstUpdate)


  await catchErrorsWithMessage('There was an error setting the process id for present price updates', updateTableRow)('project', {id: projectId}, {presentUpdatePid: pid})

  setExitListeners()

  //Ignore SIGUSR2 from nodemon restart
  process.on('SIGUSR2', () => true )

  const cleanUp = code => {
    console.log(`exiting "updatePresentPriceData" for ${name}\n exit code: ${code}` );
    clearTimeout(firstUpdateTimeout)
    clearTimeout(continuousTimeout)
  }

  process.on('exit', cleanUp)
})()
