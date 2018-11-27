const getPriceRequest = require('./getPriceRequest')

const { getScoreData } = require('../utils/')

const getPriceSeries = (endMillis, startMillis, node) => {

  const currentAvg = node.current_avg

  const {
    req,
    params,
  } = getPriceRequest(node)

  return req(
    ...params,
    startMillis,
    endMillis,
    node.name,
  )
  .then( data => {
    const dataWithAvg = data.map( obj => ({
        ...obj,
        mvgAvg: currentAvg,
      })
    )
    return getScoreData(dataWithAvg, 'lmp')
  })
  .catch( err => console.error('There was an error getting the running average:', err))
}

module.exports = getPriceSeries
