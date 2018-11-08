const demoProcess = require('./demoProcess')

const { getNodes } = require('./dbConnections/')

const {
  oasisEndpoint,
  caisoPriceRequest,
} = require('./iso/caiso/')

const { aggregateHistoricalWeather } = require('./weather/')

const updateNodeData = require('./updateNodeData')

module.exports = {
  demoProcess,
  oasisEndpoint,
  caisoPriceRequest,
  aggregateHistoricalWeather,
  getNodes,
  updateNodeData,
}
