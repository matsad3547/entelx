const moment = require('moment-timezone')

const {
  getCurrentWeather,
  getPriceSeries,
} = require('../processes/')

const getDashboardData = (
  lat,
  lng,
  timeZone,
  node
) => {

  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
                      .subtract(1, 'hour')
                      .valueOf()

  return Promise.all([
      getCurrentWeather(lat, lng),
      getPriceSeries(endMillis, startMillis, node),
    ]
    .map( p => p.catch(handleMultiPromiseError) )
  )
  .then( data => ({
      weather: data[0],
      prices: data[1],
    })
  )
}

const handleMultiPromiseError = err => {
  console.error(`there was an error: ${err}`)
  return { error: `there was an error: ${err}`}
}

module.exports = getDashboardData
