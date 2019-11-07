const updateRevenueAndSoc = require('./updateRevenueAndSoc')
const getPriceData = require('./getPriceData')

const { createTableRows } = require('../../db/')

const { catchErrorsWithMessage } = require('../../utils/')

const presentPriceDataUpdater = async (
  startMillis,
  endMillis,
  nodeData,
  project,
) => {

  const prices = await catchErrorsWithMessage(`There was an error getting present price data from ${startMillis} to ${endMillis}`, getPriceData)(startMillis, endMillis, nodeData)

  await catchErrorsWithMessage(`There was an error adding rows for data from ${startMillis} to ${endMillis}`, createTableRows)('price', prices)

  const data = {
    timeSeries: prices,
  }

  await catchErrorsWithMessage('There was an error updating state of charge and revenue', updateRevenueAndSoc)(data, 'lmp', project)
}

module.exports = presentPriceDataUpdater
