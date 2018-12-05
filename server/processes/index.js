const { oasisEndpoint } = require('./iso/')

const {
  aggregateHistoricalWeather,
  getCurrentWeather,
} = require('./weather/')

const getPriceRequest = require('./getPriceRequest')

const getNodes = require('./getNodes')


// const demoProcess = require('./demoProcess')
// const updateNodeData = require('./updateNodeData')

module.exports = {
  // demoProcess,
  oasisEndpoint,
  aggregateHistoricalWeather,
  getCurrentWeather,
  getNodes,
  // updateNodeData,
  getPriceRequest,
}
