const moment = require('moment-timezone')
const weatherKey = process.env.DARK_SKY_KEY

const {
  convertMillisToSeconds,
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

const getTimes = (startDate, endDate) => {

  const diff = endDate.diff(startDate, 'hours')

  return Array
    .apply(null, Array(Math.ceil(diff/24)))
    .map( (time, i) => endDate.valueOf() - (i * 24 * 60 * 60 * 1000) )
    .reverse()
}

const getHistoricalWeather = (start, end, lat, lng) => new Promise( (resolve, reject) => {

  const endMillis = end.valueOf()

  const startMillis = start.valueOf()

  const endDate = end.hour() < 23 ? end.clone().hour(23) : end.hour()

  const startDate = start.hour() > 0 ? start.clone().hour(0) : start.hour()

  const times = getTimes(startDate, endDate)

  console.time('weather data')

  const keys = ['temperature']

  Promise.all(times.map( time => getHistoricalWeatherByDay(time, lat, lng)))
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

const getHistoricalWeatherByDay = (time, lat, lng) => new Promise( (resolve, reject) => {

  const tsSeconds = convertMillisToSeconds(time)

  const url = `          https://api.darksky.net/forecast/${weatherKey}/${lat},${lng},${tsSeconds}?exclude=currently,flags`

  fetch(url)
    .then( res => {
      if (res.status >= 400) {
        const err = new Error("Bad response from server")
        reject(err)
      }
      else {
        return res.json()
      }
    })
    .then(resolve)
    .catch(reject)
})

module.exports = {
  getHistoricalWeather,
  parseHourlyWeatherData,
}
