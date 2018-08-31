const { getLmp } = require('../processes/getLmp')
const { getWeather } = require('../processes/getWeather')

const getCaiso = (req, res) => {

  const {
    startDate,
    endDate,
  } = req.body

  const lat = 38.5816
  const lng = -121.4944

  let caiso = {}

  getWeather(startDate, lat, lng)
    .then( weather => caiso.weather = weather.hourly.data)
    .catch( err => console.error('Error getting weather data:', err) )

  getLmp(startDate, endDate)
    .then( data => {
      caiso.data = data
    })
    .catch( err => console.error('Error getting CAISO data:', err) )

    res.json(caiso)
}

module.exports = getCaiso
