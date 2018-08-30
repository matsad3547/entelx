const weatherKey = process.env.DARK_SKY_KEY

require('isomorphic-fetch')

const getWeather = (startDate, lat, lng) => new Promise( (resolve, reject) => {

  const url = `          https://api.darksky.net/forecast/${weatherKey}/${lat},${lng},${startDate}`

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
      if (res && res.ok) {
        console.timeEnd('lmp data')
        resolve(res)
      }
      else {
        console.error('There was an error getting weather data')

        reject()
      }
    })
    .catch( err => console.error('There was an error in the weather module:', err) )
})

module.exports = {
  getWeather,
}
