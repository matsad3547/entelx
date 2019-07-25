const updateRevenueAndSoc = require('./updateRevenueAndSoc')
const updatePriceData = require('./updatePriceData')

const { createTableRows } = require('../../db/')

const { catchErrorsWithMessage } = require('../../utils/')

const presentPriceDataUpdater = async (
  startMillis,
  endMillis,
  nodeData,
  project,
) => {

  const {
    id,
    currentAvg,
  } = nodeData

  const newData = await catchErrorsWithMessage(`There was an error getting present price data from ${startMillis} to ${endMillis}`, updatePriceData)(startMillis, endMillis, nodeData)

  const timeSeries = newData.map( obj => ({
      ...obj,
      mvgAvg: currentAvg,
      nodeId: id,
      score: (obj.lmp - currentAvg) / currentAvg,
    })
  )

  const aggregate = {
    mean: currentAvg,
  }

  const data = {
    timeSeries,
    aggregate,
  }

  await catchErrorsWithMessage(`There was an error adding rows for data from ${startMillis} to ${endMillis}`, createTableRows)('price', timeSeries)

  await catchErrorsWithMessage('There was an error updating state of charge and revenue', updateRevenueAndSoc)(data, 'lmp', project)

  return newData[data.length - 1].timestamp
}

module.exports = presentPriceDataUpdater
