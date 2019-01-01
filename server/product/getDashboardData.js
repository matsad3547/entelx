const moment = require('moment-timezone')

const {
  getCurrentWeather,
  getPriceRequest,
} = require('../processes/')

const { calculateScoreData } = require('../utils/')

const getDashboardData = (
  lat,
  lng,
  timeZone,
  node
) => {

  // TODO ms this will change to just take lat, lng, timeZone, and node and return the weather request as well as the last hour of data for that project

  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
                      .subtract(1, 'hour')
                      .valueOf()

  const {
    name,
    currentAvg,
  } = node

  const {
    req,
    params,
  } = getPriceRequest(node)

  return Promise.all([
      getCurrentWeather(lat, lng),
      req(
        ...params,
        startMillis,
        endMillis,
        name,
      ),
    ]
    .map( p => p.catch(handleMultiPromiseError) )
  )
  .then( data => {

    const dataWithAvg = data[1].map( obj => ({
        ...obj,
        mvgAvg: currentAvg,
      })
    )

    const processedData = calculateScoreData(dataWithAvg, 'lmp')

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

module.exports = getDashboardData
