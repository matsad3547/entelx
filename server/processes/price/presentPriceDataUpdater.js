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
    name,
    currentAvg,
  } = nodeData

  const data = await catchErrorsWithMessage(`There was an error getting present price data from ${startMillis} to ${endMillis}`, updatePriceData)(startMillis, endMillis, nodeData)

  const dataWithAvg = data.map( obj => ({
      ...obj,
      mvgAvg: currentAvg,
      nodeId: id,
      score: (obj.lmp - currentAvg) / currentAvg,
    })
  )

  await catchErrorsWithMessage(`There was an error adding rows for data from ${startMillis} to ${endMillis}`, createTableRows)('price', dataWithAvg)

  await catchErrorsWithMessage('There was an error updating state of charge and revenue', updateRevenueAndSoc)(dataWithAvg, 'lmp', project)

  return data[data.length - 1].timestamp
}

module.exports = presentPriceDataUpdater
