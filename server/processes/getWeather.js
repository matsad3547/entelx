const weatherKey = process.env.DARK_SKY_KEY

const {
  convertMillisToSeconds,
  convertSecondsToMillis,
} = require('../utils/')

const parseHourlyWeatherData = (hourlyWeatherObj, ...keys) => {

  const otherVals = keys.reduce( (obj, key) => ({
    ...obj,
    [key]: hourlyWeatherObj[key],
  }), {})

  return {
    timestamp: convertSecondsToMillis(hourlyWeatherObj.time),
    ...otherVals,
  }
}

const getWeather = (startDate, endDate, lat, lng) => new Promise( (resolve, reject) => {

  const endDate = new Date(endDate)
  const startDate = new Date(endDate)

  const endMillis = endDate.getTime()
  const startMillis = startDate.getTime()

  const tsSeconds = convertMillisToSeconds(endMillis)

  const url = `          https://api.darksky.net/forecast/${weatherKey}/${lat},${lng},${tsSeconds}?exclude=currently,flags`

  console.log('url:', url);

  console.time('weather data')

  const keys = ['temperature']

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
    .then( res => {
      console.timeEnd('weather data')
      resolve(
        res.hourly.data.map( d => parseHourlyWeatherData(d, ...keys) )
          .filter( d => d.timestamp > startMillis )
      )
    })
    .catch(reject)
})

module.exports = {
  getWeather,
  parseHourlyWeatherData,
}
