const moment = require('moment-timezone')

const { getPriceRequest } = require('../processes/')

const { calculateDerivedData } = require('../utils/')

const { dayOf5Mins } = require('../config/')

const getDerivedData = (node, timeZone) => {

  const numDays = 21
  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
                      .subtract(numDays, 'days')
                      .valueOf()

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
  .then( data => calculateDerivedData(data, 'lmp', numDays * dayOf5Mins) )
  .catch( err => console.error('There was an error getting the running average:', err))
}

module.exports = getDerivedData
