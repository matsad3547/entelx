( async () => {

  const moment = require('moment-timezone')

  const {
    setExitListeners,
    getUpdateTimeout,
    catchErrorsWithMessage,
    catchErrorAndRestart,
  } = require('../../utils/')

  const { fiveMinutesMillis } = require('../../config/')

  const {
    getFiveMinutesFromNow,
    getOneMinuteAgo,
    getFirstUpdateMillis,
    getSixMosAgo,
  } = require('./utils/')

  const {
    readTableRows,
    updateTableRow,
    deleteTableRowsWhereNot,
  } = require('../../db/')

  const presentPriceDataUpdater = require('./presentPriceDataUpdater')

  const args = JSON.parse(process.argv[2])

  const {
    node,
    projectId,
    mostRecent,
  } = args

  const {
    id,
    name,
  } = node

  let firstUpdateTimeout, continuousTimeout, firstUpdate

  const [nodeData] = await readTableRows('node', {id,})

  firstUpdate = getUpdateTimeout(mostRecent)

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

        console.log(`price data update at ${now.valueOf()}`)

        const newest = await catchErrorAndRestart('There was an error getting continuous price updates', presentPriceDataUpdater, getPriceDataOnInterval)(startMillis, endMillis, nodeData, project)

        nextTimeoutMillis = getUpdateTimeout(newest)

        const sixMosAgo = getSixMosAgo(now)

        console.log('gonna check for data older than 6 mos');
        //TODO delete data more than 6 mos. old
        getPriceDataOnInterval(nextTimeoutMillis)

      }, timeoutMillis)
    }

    getPriceDataOnInterval(nextTimeoutMillis)
  }, firstUpdate)

  const pid = process.pid

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
