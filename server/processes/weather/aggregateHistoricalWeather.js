const moment = require('moment-timezone')

const { getTimestamps } = require('./utils')
const { getHistoricalWeatherByDay } = require('./getHistoricalWeatherByDay')
const { parseHourlyWeatherData } = require('./parsers')

const aggregateHistoricalWeather = (
  startMillis,
  endMillis,
  timeZone,
  lat,
  lng
) => new Promise( (resolve, reject) => {

  console.time('weather data')

  const start = moment.tz(startMillis, timeZone)

  const end = moment.tz(endMillis, timeZone)

  const adjEndMillis = end.hour() < 23 ? end.clone().hour(23).valueOf() : end.hour().valueOf()

  const adjStartMillis = start.hour() > 0 ? start.clone().hour(0).valueOf() : start.hour().valueOf()

  const timestamps = getTimestamps(adjStartMillis, adjEndMillis)

  const keys = [
    'temperature',
    'windSpeed',
    'windBearing',
    'cloudCover',
  ]

  Promise.all(timestamps.map( timestamp => getHistoricalWeatherByDay(timestamp, lat, lng)))
    .then(res => {
      console.timeEnd('weather data')

      resolve(
        res.reduce( (arr, wd) => {
            const parsedData = wd.hourly.data.map( d => parseHourlyWeatherData(d, ...keys) )
            return [...arr, ...parsedData]
          }, [])
          .filter( d => d.timestamp > startMillis && d.timestamp < endMillis )
      )
    })
    .catch( err => console.error(`There was an error getting weather data: ${err}`))
})

module.exports = {
  aggregateHistoricalWeather,
}
