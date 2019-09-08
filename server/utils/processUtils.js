const {
  findMax,
  findMin,
} = require('../db/')
const { catchErrorsWithMessage } = require('./requestUtils')

const exitSignals = [
  //catches ctrl+c event
  'SIGINT',
  //catches "process.kill(<pid>)"
  'SIGTERM',
  //catches "kill pid" (for example: nodemon restart)
  'SIGUSR1',
  // 'SIGUSR2', //prevent kill on nodemon restart
  'uncaughtException',
]

const exitProcess = (signal, code) => {
  console.log('exiting with:', signal)
  process.exit(code)
}

const setExitListeners = () => exitSignals.forEach( signal => process.on(signal, exitProcess) )

const getMaxTimeStamp = async nodeId => {

  const max = await catchErrorsWithMessage(`There was an error finding the max timestamp associated with node ${nodeId}`, findMax)('price', 'timestamp', {nodeId,})

  return max[0]['max(timestamp)']
}

const getMinTimeStamp = async nodeId => {

  const min = await catchErrorsWithMessage(`There was an error finding the min timestamp associated with node ${nodeId}`, findMin)('price', 'timestamp', {nodeId,})

  return min[0]['min(timestamp)']
}

module.exports = {
  setExitListeners,
  getMaxTimeStamp,
  getMinTimeStamp,
}
