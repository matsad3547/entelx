const weatherKey = process.env.DARK_SKY_KEY
const { checkStatus } = require('../../utils/')

const getCurrentWeather = (lat, lng) => new Promise( (resolve, reject) => {

  const url = `          https://api.darksky.net/forecast/${weatherKey}/${lat},${lng}`

  console.log('url:', url);

  fetch(url)
    .then(checkStatus)
    .then( res => res.json() )
    .then(data => resolve(data.currently) )
    .catch(reject)
})

module.exports = getCurrentWeather
