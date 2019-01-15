const {
  aggregateHistoricalWeather,
  getCurrentWeather,
} = require('./weather/')

const {
  getPriceRequest,
  launchPriceUpdates,
} = require('./price/')

const getNodes = require('./getNodes')

// const demoProcess = require('./demoProcess')

module.exports = {
  // demoProcess,
  aggregateHistoricalWeather,
  getCurrentWeather,
  getNodes,
  getPriceRequest,
  launchPriceUpdates,
}
