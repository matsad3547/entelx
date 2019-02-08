const updatePriceData = require('./updatePriceData')

const { createTableRows } = require('../../db/')

const {
  catchErrorsWithMessage,
  calculateDerivedData,
} = require('../../utils/')

const {dayOf5Mins} = '../../config/'

const pastPriceDataUpdater = async (
  startMillis,
  endMillis,
  nodeData,
) => {

  const {
    id,
    name,
    currentAvg,
  } = nodeData

  const data = await catchErrorsWithMessage(`There was an error getting past price data from ${startMillis} to ${endMillis}`, updatePriceData)(startMillis, endMillis, nodeData)

  const derivedData = calculateDerivedData(data, 'lmp', 21 * dayOf5Mins)

  const { timeSeries } = derivedData

  const completeData = timeSeries.map( ts => ({
      ...ts,
      nodeId: id,
    })
  )

  await catchErrorsWithMessage(`There was an error adding rows for data from ${startMillis} to ${endMillis}`, createTableRows)('price', completeData)

  return data[0].timestamp
}

module.exports = pastPriceDataUpdater
