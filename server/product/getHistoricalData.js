const moment = require('moment-timezone')

const {
  aggregateHistoricalWeather,
  getPriceRequest,
} = require('../processes/')

const { calculateDerivedData } = require('../utils/')

const { dayOf5Mins } = require('../config/')

const getHistoricalData = (
  lat,
  lng,
  timeZone,
  node,
  numDays,
) => {

  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
                      .subtract(numDays, 'days')
                      .valueOf()

  const {
    req,
    params,
  } = getPriceRequest(node)

  return Promise.all([
      aggregateHistoricalWeather(
        startMillis,
        endMillis,
        timeZone,
        lat,
        lng,
      ),
      req(
        ...params,
        startMillis,
        endMillis,
        node.name,
      ),
    ]
    .map( p => p.catch(handleMultiPromiseError) )
  )
  .then( data => {

    const processedData = calculateDerivedData(data[1], 'lmp', numDays * dayOf5Mins)

    return {
      weather: data[0],
      prices: processedData.timeSeries,
      aggregate: processedData.aggregate,
    }
  })
}

const handleMultiPromiseError = err => {
  console.error(`there was an error: ${err}`)
  return { error: `there was an error: ${err}`}
}

module.exports = getHistoricalData
