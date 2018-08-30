const weatherKey = process.env.DARK_SKY_KEY

const { convertMillisToSeconds } = require('../utils/')

const getWeather = (startDate, lat, lng) => new Promise( (resolve, reject) => {

  const date = new Date(startDate)

  const tsMillis = date.getTime()

  const tsSeconds = convertMillisToSeconds(tsMillis)

  const url = `          https://api.darksky.net/forecast/${weatherKey}/${lat},${lng},${tsSeconds}?exclude=currently,flags`

  console.log('url:', url);

  console.time('weather data')

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
      resolve(res)
    })
    .catch(reject)
})

module.exports = {
  getWeather,
}
