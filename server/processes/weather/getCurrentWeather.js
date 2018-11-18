const weatherKey = process.env.DARK_SKY_KEY
const { checkStatus } = require('../../utils/')

const getCurrentWeather = (lat, lng) => {

  const url = `          https://api.darksky.net/forecast/${weatherKey}/${lat},${lng}`

  return fetch(url)
    .then(checkStatus)
    .then( res => res.json() )
    .then( data => data.currently )
    .catch( err => console.error(`there was an error fetching current weather: ${err}`) )
}

module.exports = getCurrentWeather
