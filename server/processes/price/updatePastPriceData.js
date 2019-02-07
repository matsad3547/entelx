( async () => {

  const moment = require('moment-timezone')

  const {
    setExitListeners,
    getUpdateTimeout,
    catchErrorsWithMessage,
    catchErrorAndRestart,
    calculateDerivedData,
  } = require('../../utils/')

  const {getSixMosAgo} = require('./utils/')

  const {
    readTableRows,
    updateTableRow,
  } = require('../../db/')

  const updatePriceData = require('./updatePriceData')

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

  let now = moment()

  let startMillis = getSixMosAgo(now)
  let endMillis = now.clone().valueOf()

  const [nodeData] = await readTableRows('node', {id,})

  const {end} = await catchErrorsWithMessage('There was an error getting the initial price update', updatePriceData)(nodeData, endMillis, startMillis)


  const pid = process.pid

  await catchErrorsWithMessage('There was an error setting the process id for present price updates', updateTableRow)('project', {id: projectId}, {pid,})

  setExitListeners()

  //Ignore SIGUSR2 from nodemon restart
  process.on('SIGUSR2', () => true )

  const cleanUp = code => {
    console.log(`exiting "updatePastPriceData" for ${name}\n exit code: ${code}` );
    clearTimeout(firstUpdateTimeout)
    clearTimeout(continuousTimeout)
  }

  process.on('exit', cleanUp)
})()
