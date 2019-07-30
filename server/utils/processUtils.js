const { findMax } = require('../db/')

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
  const max = await findMax('price', 'timestamp', {nodeId, })

  return max[0]['max(timestamp)']
}

module.exports = {
  setExitListeners,
  getMaxTimeStamp,
}
