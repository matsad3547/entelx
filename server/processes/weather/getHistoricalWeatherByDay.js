const weatherKey = process.env.DARK_SKY_KEY
const { checkStatus } = require('../../utils/')

const getHistoricalWeatherByDay = (tsSeconds, lat, lng) => new Promise( (resolve, reject) => {

  const url = `          https://api.darksky.net/forecast/${weatherKey}/${lat},${lng},${tsSeconds}?exclude=currently,flags,units=si`

  fetch(url)
    .then(checkStatus)
    .then( res => res.json() )
    .then(resolve)
    .catch(reject)
})

module.exports = getHistoricalWeatherByDay
