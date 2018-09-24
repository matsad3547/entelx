const moment = require('moment-timezone')
const weatherKey = process.env.DARK_SKY_KEY

const {
  convertMillisToSeconds,
  checkStatus,
} = require('../utils/')

const parseHourlyWeatherData = (hourlyWeatherObj, ...keys) => {

  const otherVals = keys.reduce( (obj, key) => ({
    ...obj,
    [key]: hourlyWeatherObj[key],
  }), {})

  return {
    timestamp: hourlyWeatherObj.time * 1000,
    ...otherVals,
  }
}

const getTimestamps = (adjStartMillis, adjEndMillis) => {

  const diff = (adjEndMillis - adjStartMillis) / (60 * 60 * 1000)

  return Array.apply(null, Array(Math.ceil(diff/24)))
    .map( (time, i) => convertMillisToSeconds(adjStartMillis + (i * 24 * 60 * 60 * 1000)) )
}

const getHistoricalWeather = (
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

const getHistoricalWeatherByDay = (tsSeconds, lat, lng) => new Promise( (resolve, reject) => {

  const url = `          https://api.darksky.net/forecast/${weatherKey}/${lat},${lng},${tsSeconds}?exclude=currently,flags,units=si`

  fetch(url)
    .then(checkStatus)
    .then( res => res.json() )
    .then(resolve)
    .catch(reject)
})

module.exports = {
  getHistoricalWeather,
  parseHourlyWeatherData,
}
