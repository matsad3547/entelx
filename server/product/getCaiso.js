const { getLmp } = require('../processes/getLmp')
const { getWeather } = require('../processes/getWeather')

const getCaiso = (req, res) => {

  const {
    startDate,
    endDate,
  } = req.body

  const lat = 38.5816
  const lng = -121.4944

  getWeather(startDate, lat, lng)
    .then( res => console.log('weather data at CAISO:', res))
    .catch( err => console.error('Error getting weather data:', err) )

  getLmp(startDate, endDate)
    .then( data => {
      res.json({
        data,
      })
    })
    .catch( err => console.error('Error getting CAISO data:', err) )
}

module.exports = getCaiso
