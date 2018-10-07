const demoProcess = require('./demoProcess')

const {
  oasisEndpoint,
  getNodeLocations,
  caisoPriceRequest,
} = require('./iso/caiso/')

const { aggregateHistoricalWeather } = require('./weather/')

module.exports = {
  demoProcess,
  oasisEndpoint,
  getNodeLocations,
  caisoPriceRequest,
  aggregateHistoricalWeather,
}
