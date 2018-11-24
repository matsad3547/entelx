const moment = require('moment-timezone')

const getPriceRequest = require('./getPriceRequest')

const {
  calculateMovingAverage,
  scoreValues,
} = require('../utils/')

const getRunningAverage = node => {

  const numDays = 21
  const timeZone = 'America/Los_Angeles'
  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
                      .subtract(numDays, 'days')
                      .valueOf()

  const dayOf5Mins = (24 * 60) / 5

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
  .then( data => calculateMovingAverage(data, 'lmp', numDays * dayOf5Mins) )
  .catch( err => console.error('There was an error getting the running average:', err))
}

module.exports = getRunningAverage
