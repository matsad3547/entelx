const getPriceRequest = require('./getPriceRequest')

const { createTableRows } = require('../../db/')

const updatePriceData = (
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

  return req(
      ...params,
      startMillis,
      endMillis,
      name,
    )
    .then( data => {

      const dataWithAvg = data.map( obj => ({
        ...obj,
        mvgAvg: currentAvg,
        nodeId: id,
        score: (obj.lmp - currentAvg) / currentAvg,
      })
    )

    return createTableRows(
      'price',
      dataWithAvg
    )
    .then( () => data[data.length - 1].timestamp )
    .catch( err => {
      console.error(`There was an error adding rows for data from ${startMillis} to ${endMillis}:`, err)
      if (err) throw err
    })
  })
  .catch( err => {
    console.error(`There was an error getting data from ${startMillis} to ${endMillis}:`, err)
    if (err) throw err
  })
}

module.exports = updatePriceData
