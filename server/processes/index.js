const { oasisEndpoint } = require('./iso/')

const {
  aggregateHistoricalWeather,
  getCurrentWeather,
} = require('./weather/')

const calculateDerivedData = require('./calculateDerivedData')
const getPriceSeries = require('./getPriceSeries')
// const demoProcess = require('./demoProcess')

// const getNodes = require('./getNodes')


// const updateNodeData = require('./updateNodeData')

module.exports = {
  // demoProcess,
  oasisEndpoint,
  aggregateHistoricalWeather,
  getCurrentWeather,
  // getNodes,
  // updateNodeData,
  calculateDerivedData,
  getPriceSeries,
}
