( async () => {

  const {
    setExitListeners,
    catchErrorsWithMessage,
    catchErrorAndRestart,
  } = require('../../utils/')

  const {
    oneMinuteMillis,
    sixMonthMillis,
    threeWeeksMillis,
  } = require('../../config/')

  const {
    readTableRows,
    updateTableRow,
  } = require('../../db/')

  const pastPriceDataUpdater = require('./pastPriceDataUpdater')

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

  const sixMonthsAgoMillis = mostRecent - sixMonthMillis

  let endMillis = mostRecent - oneMinuteMillis

  const [nodeData] = await readTableRows('node', {id,})

  const pid = process.pid

  let tries = 0

  const update = async () => {
    const startMillis = endMillis - threeWeeksMillis
    const oldest = await catchErrorAndRestart('There was an error getting past update data', pastPriceDataUpdater, restartPastPriceUpdates )(startMillis, endMillis, nodeData)

    if (oldest < sixMonthsAgoMillis) {
      exitPastPriceUpdates()
    }
    else {
      tries = 0
      endMillis = oldest - oneMinuteMillis
      update()
    }
  }

  const restartPastPriceUpdates = () => {
    setTimeout( () => {
      tries++
      update()
    }, oneMinuteMillis)
    if (tries > 5) {
      exitPastPriceUpdates()
    }
    else {
      return false
    }
   }

  const exitPastPriceUpdates = async () => {
    await catchErrorsWithMessage('There was an error resetting the process id for past price updates', updateTableRow)('project', {id: projectId}, {pastUpdatePid: null})
    process.kill(pid)
  }

  update()

  await catchErrorsWithMessage('There was an error setting the process id for past price updates', updateTableRow)('project', {id: projectId}, {pastUpdatePid: pid})

  setExitListeners()

  //Ignore SIGUSR2 from nodemon restart
  process.on('SIGUSR2', () => true )

  const cleanUp = code => {
    console.log(`exiting "updatePastPriceData" for ${name}\n exit code: ${code}` )
  }

  process.on('exit', cleanUp)
})()
