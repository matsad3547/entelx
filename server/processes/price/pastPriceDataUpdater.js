const getPriceData = require('./getPriceData')

const { createTableRows } = require('../../db/')

const {
  catchErrorsWithMessage,
} = require('../../utils/')

const pastPriceDataUpdater = async (
  startMillis,
  endMillis,
  nodeData,
) => {

  const prices = await catchErrorsWithMessage(`There was an error getting past price data from ${startMillis} to ${endMillis}`, getPriceData)(startMillis, endMillis, nodeData)

  await catchErrorsWithMessage(`There was an error adding rows for data from ${startMillis} to ${endMillis}`, createTableRows)('price', prices)
}

module.exports = pastPriceDataUpdater
