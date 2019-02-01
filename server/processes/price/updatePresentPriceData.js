( async () => {

  const moment = require('moment-timezone')

  const {
    setExitListeners,
    getUpdateTimeout,
    catchErrorsWithMessage
  } = require('../../utils/')

  const { fiveMinutesMillis } = require('../../config/')

  const {
    getFiveMinutesFromNow,
    getOneMinuteAgo,
    getFirstUpdateMillis,
  } = require('./utils/')

  const {
    readTableRows,
    updateTableRow,
    deleteTableRowsWhereNot,
  } = require('../../db/')

  const updatePriceData = require('./updatePriceData')

  const args = JSON.parse(process.argv[2])

  const {
    node,
    timeZone,
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
    let now = moment().tz(timeZone)

    console.log(`starting price data update at ${now.valueOf()}`)

    let endMillis = getFiveMinutesFromNow(now)
    let startMillis = getOneMinuteAgo(now)

    const [project] = await readTableRows('project', {id: projectId})

    const {end} = await catchErrorsWithMessage('There was an error getting the initial price update', updatePriceData)(nodeData, endMillis, startMillis, project)

    let nextTimeoutMillis = getUpdateTimeout(end)

    const getPriceDataOnInterval = (timeoutMillis = fiveMinutesMillis) => {
      continuousTimeout = setTimeout( async () => {

        now = moment().tz(timeZone)

        endMillis = getFiveMinutesFromNow(now)
        startMillis = getOneMinuteAgo(now)

        const [project] = await readTableRows('project', {id: projectId})

        console.log(`price data update at ${now.valueOf()}`)

        const {end} = await catchErrorsWithMessage('There was an error getting continuous price updates', updatePriceData)(nodeData, endMillis, startMillis, project)

        nextTimeoutMillis = getUpdateTimeout(end)

        const sixMosAgo = now.clone()
        .subtract(180, 'days')
        .valueOf()

        console.log('gonna check for data older than 6 mos');
        //TODO delete data more than 6 mos. old
        getPriceDataOnInterval(nextTimeoutMillis)

      }, timeoutMillis)
    }

    getPriceDataOnInterval(nextTimeoutMillis)
  }, firstUpdate)

  const pid = process.pid

  await catchErrorsWithMessage('There was an error setting the process id for present price updates', updateTableRow)('project', {id: projectId}, {pid,})

  setExitListeners()

  //Ignore SIGUSR2 from nodemon restart
  process.on('SIGUSR2', () => true )

  const cleanUp = code => {
    console.log(`exiting "updatePriceData" for ${name}\n exit code: ${code}` );
    clearTimeout(firstUpdateTimeout)
    clearTimeout(continuousTimeout)
  }

  process.on('exit', cleanUp)
})()
