const demoProcess = require('./demoProcess')

const {
  oasisEndpoint,
  getNodeLocations,
  getControlAreas,
  caisoPriceRequest,
} = require('./iso/caiso/')

const { aggregateHistoricalWeather } = require('./weather/')

module.exports = {
  demoProcess,
  oasisEndpoint,
  getNodeLocations,
  getControlAreas,
  caisoPriceRequest,
  aggregateHistoricalWeather,
}
