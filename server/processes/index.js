const demoProcess = require('./demoProcess')

const getNodes = require('./getNodes')

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
