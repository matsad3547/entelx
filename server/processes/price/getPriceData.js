const getPriceRequest = require('./getPriceRequest')

const { catchErrorsWithMessage } = require('../../utils/')

const getPriceData = async (
  startMillis,
  endMillis,
  nodeData,
) => {

  const {
    name,
    id,
  } = nodeData

  const {
    req,
    params,
  } = getPriceRequest(nodeData)

  const priceData = await catchErrorsWithMessage(`There was an error getting price data from ${startMillis} to ${endMillis}`, req)(...params, startMillis, endMillis, name)

  return priceData.map( priceDataPoint => ({
      ...priceDataPoint,
      nodeId: id,
    })
  )
}

module.exports = getPriceData
