const demoProcess = require('./demoProcess')

const {
  oasisEndpoint,
  getNodeLocations,
} = require('./iso/caiso/')
const { aggregateHistoricalWeather } = require('./weather/')

module.exports = {
  demoProcess,
  oasisEndpoint,
  getNodeLocations,
  aggregateHistoricalWeather,
}
