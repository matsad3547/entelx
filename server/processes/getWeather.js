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

const millisToTzDate = (dateOrMillis, tz) => new Date(dateOrMillis).toLocaleString('en-US', {timeZone: tz})

const getWeather = (start, end, lat, lng) => new Promise( (resolve, reject) => {

  console.log('start date at getWeather:', start, '\end date at getWeather:', end)

  const endDate = new Date(end)
  const startDate = new Date(start)

  const endMillis = endDate.getTime()
  const startMillis = startDate.getTime()

  // const now = new Date()
  // const tsSeconds = convertMillisToSeconds(now.getTime())
  // const tsSeconds = convertMillisToSeconds(startMillis)
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
      console.log('weather data:', res);

      const tz = res.timezone
      const times = res.hourly.data.map( d => millisToTzDate(convertSecondsToMillis(d.time))
      )
      // resolve(
      //   {
      //     ...res,
      //     times,
      //   }
      // )
      // resolve(
      //   res
      // )
      resolve(
        res.hourly.data.map( d => parseHourlyWeatherData(d, ...keys) )
          // .filter( d => d.timestamp > startMillis )
      )
    })
    .catch(reject)
})

module.exports = {
  getWeather,
  parseHourlyWeatherData,
}
