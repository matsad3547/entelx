const demoProcess = require('./demoProcess')

const getNodes = require('./getNodes')

const {
  oasisEndpoint,
  caisoPriceRequest,
} = require('./iso/caiso/')

const {
  aggregateHistoricalWeather,
  getCurrentWeather,
} = require('./weather/')

const updateNodeData = require('./updateNodeData')

module.exports = {
  demoProcess,
  oasisEndpoint,
  caisoPriceRequest,
  aggregateHistoricalWeather,
  getCurrentWeather,
  getNodes,
  updateNodeData,
}
