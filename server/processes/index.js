const demoProcess = require('./demoProcess')

const { oasisEndpoint } = require('./iso/caiso/')
const { aggregateHistoricalWeather } = require('./weather/')

module.exports = {
  demoProcess,
  oasisEndpoint,
  aggregateHistoricalWeather,
}
