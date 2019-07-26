const updatePriceData = require('./updatePriceData')

const { createTableRows } = require('../../db/')

const {
  catchErrorsWithMessage,
  calculateScoreData,
} = require('../../utils/')

const {dayOf5Mins} = require('../../config/')

const pastPriceDataUpdater = async (
  startMillis,
  endMillis,
  nodeData,
) => {

  const { id } = nodeData

  const data = await catchErrorsWithMessage(`There was an error getting past price data from ${startMillis} to ${endMillis}`, updatePriceData)(startMillis, endMillis, nodeData)

  const { timeSeries } = calculateScoreData(data, 'lmp', {period: 21 * dayOf5Mins})

  const timeSeriesWithNode = timeSeries.map( ts => ({
      ...ts,
      nodeId: id,
    })
  )

  await catchErrorsWithMessage(`There was an error adding rows for data from ${startMillis} to ${endMillis}`, createTableRows)('price', timeSeriesWithNode)

  return data[0].timestamp
}

module.exports = pastPriceDataUpdater
