const getPriceRequest = require('./getPriceRequest')

const { createTableRows } = require('../../db/')

const { catchErrorsWithMessage } = require('../../utils/')

const updatePriceData = async (
  nodeData,
  endMillis,
  startMillis,
) => {

  const {
    id,
    name,
    currentAvg,
  } = nodeData

  const {
    req,
    params,
  } = getPriceRequest(nodeData)

  const data = await catchErrorsWithMessage(`There was an error getting data from ${startMillis} to ${endMillis}`, req)(...params, startMillis, endMillis, name)

  const dataWithAvg = data.map( obj => ({
      ...obj,
      mvgAvg: currentAvg,
      nodeId: id,
      score: (obj.lmp - currentAvg) / currentAvg,
    })
  )

  await catchErrorsWithMessage(`There was an error adding rows for data from ${startMillis} to ${endMillis}`, createTableRows)('price', dataWithAvg)

  return {
    start: data[0].timestamp,
    end: data[data.length - 1].timestamp,
  }
}

module.exports = updatePriceData
