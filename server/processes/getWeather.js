const weatherKey = process.env.DARK_SKY_KEY

require('isomorphic-fetch')

const getWeather = (startDate, lat, lng) => new Promise( (resolve, reject) => {

  // const url = `          https://api.darksky.net/forecast/${weatherKey}/${lat},${lng},${startDate}`
  const url = `https://api.darksky.net/forecast/6a9cbffd5f83537fcdeefa64abc43023/37.8267,-122.4233`

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
