const getPriceRequest = require('./getPriceRequest')

const { catchErrorsWithMessage } = require('../../utils/')

const updatePriceData = async (
  startMillis,
  endMillis,
  nodeData,
) => {

  const {name} = nodeData

  const {
    req,
    params,
  } = getPriceRequest(nodeData)

  return await catchErrorsWithMessage(`There was an error getting data from ${startMillis} to ${endMillis}`, req)(...params, startMillis, endMillis, name)
}

module.exports = updatePriceData
