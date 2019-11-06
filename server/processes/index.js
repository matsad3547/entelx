const {
  aggregateHistoricalWeather,
  getCurrentWeather,
} = require('./weather/')

const {
  getPriceData,
  launchPriceUpdates,
} = require('./price/')

const getNodes = require('./getNodes')

const runTest = require('./runTest')

// const demoProcess = require('./demoProcess')

module.exports = {
  // demoProcess,
  aggregateHistoricalWeather,
  getCurrentWeather,
  getNodes,
  getPriceData,
  launchPriceUpdates,
  runTest,
}
