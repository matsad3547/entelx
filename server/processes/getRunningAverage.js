const moment = require('moment-timezone')

const getPriceRequest = require('./getPriceRequest')

const { scoreValues } = require('../utils/')

const getRunningAverage = node => {
  console.time(`get running average`)

  const timeZone = 'America/Los_Angeles'
  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
                      .subtract(1, 'days')
                      .valueOf()

  const weekOf5Mins = (7 * 24 * 60) / 5

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
    console.timeEnd(`get running average`)
    return scoreValues(data, 'lmp', 2 * weekOf5Mins)
  })
  .catch( err => console.error('There was an error getting the running average:', err))
}

module.exports = getRunningAverage
