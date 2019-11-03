( async () => {

  const moment = require('moment-timezone')

  const {
    setExitListeners,
    getUpdateTimeout,
    catchErrorsWithMessage,
    getMaxTimeStamp,
  } = require('../../utils/')

  const {
    fiveMinutesMillis,
    // sixMonthMillis,
    // oneMinuteMillis,
  } = require('../../config/')

  const {
    getFiveMinutesFromNow,
    getDBDatetime,
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

  let mostRecent = await getMaxTimeStamp(id)

  let firstUpdateTimeout, continuousTimeout, firstUpdate

  const [nodeData] = await readTableRows('node', {id,})

  firstUpdate = getUpdateTimeout(mostRecent)

  console.log('Most recent:', mostRecent, 'Starting present price data updates in:', firstUpdate);

  const pid = process.pid

  firstUpdateTimeout = setTimeout( async () => {
    let now = moment()

    console.log(`starting price data update at ${now}`)

    let endMillis = getFiveMinutesFromNow(now)
    let startMillis = moment(mostRecent).add(1, 'minute').valueOf()
    // let startMillis = mostRecent + oneMinuteMillis

    const [project] = await readTableRows('project', {id: projectId})

    await catchErrorsWithMessage('There was an error getting the initial price update', presentPriceDataUpdater, false)(startMillis, endMillis, nodeData, project)

    mostRecent = await getMaxTimeStamp(id)

    let nextTimeoutMillis = getUpdateTimeout(mostRecent)

    const getPriceDataOnInterval = (timeoutMillis = fiveMinutesMillis) => {
      continuousTimeout = setTimeout( async () => {

        now = moment()

        mostRecent = await getMaxTimeStamp(id)

        endMillis = getFiveMinutesFromNow(now)
        startMillis = moment(mostRecent).add(1, 'minute').valueOf()
        // startMillis = mostRecent + oneMinuteMillis

        const [project] = await readTableRows('project', {id: projectId})

        console.log(`periodic price data update at ${now.format()}`)

        await catchErrorsWithMessage('There was an error getting periodic price updates', presentPriceDataUpdater, false)(startMillis, endMillis, nodeData, project)

        mostRecent = await getMaxTimeStamp(id)

        nextTimeoutMillis = getUpdateTimeout(mostRecent)

        const sixMonthsAgo = moment(mostRecent).subtract(6, 'month').toISOString()

        await catchErrorsWithMessage('There was an error deleting data older than 6 months', deleteTableRowsWhereBtw, false)('price', {nodeId: id}, 'timestamp', [0, getDBDatetime(sixMonthsAgo)])


        // const newest = await catchErrorsWithMessage('There was an error getting periodic price updates', presentPriceDataUpdater, false)(startMillis, endMillis, nodeData, project)
        //
        // if (!isNaN(newest)) {
        //   nextTimeoutMillis = getUpdateTimeout(newest)
        //
        //   await catchErrorsWithMessage('There was an error deleting data older than 6 months', deleteTableRowsWhereBtw, false)('price', {nodeId: id}, 'timestamp', [0, newest - sixMonthMillis])
        // }
        // else {
        //   nextTimeoutMillis = fiveMinutesMillis - (30 * 1000)
        // }

        getPriceDataOnInterval(nextTimeoutMillis)
      }, timeoutMillis)
    }

    getPriceDataOnInterval(nextTimeoutMillis)
  }, firstUpdate)

  await catchErrorsWithMessage('There was an error setting the process id for present price updates', updateTableRow, false)('project', {id: projectId}, {presentUpdatePid: pid})

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
