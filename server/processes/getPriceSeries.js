const moment = require('moment-timezone')

const getPriceRequest = require('./getPriceRequest')

const { calculateScore } = require('../utils/')

const getPriceSeries = node => {
  console.time('get price series')

  const timeZone = 'America/Los_Angeles'
  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
                      .subtract(1, 'hour')
                      .valueOf()

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
    console.timeEnd('get price series')
    return calculateScore(dataWithAvg, 'lmp')
  })
  .catch( err => console.error('There was an error getting the running average:', err))
}

module.exports = getPriceSeries
