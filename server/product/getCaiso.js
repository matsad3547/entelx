const { getLmp } = require('../processes/getLmp')
const { getWeather } = require('../processes/getWeather')

const getCaiso = (req, res) => {

  const {
    startDate,
    endDate,
    // TODO bring in lat lng from front end
  } = req.body

  const lat = 38.5816
  const lng = -121.4944

  Promise.all([
    getWeather(startDate, endDate, lat, lng),
    getLmp(startDate, endDate)
  ])
  .then( data => res.json(
    data)
  )
  // .then( data => res.json(
  //   data.reduce( (agr, arr) => [...agr, ...arr])
  //
  //   )
  // )
  .catch( err => console.error('Error getting CAISO data:', err) )

}

module.exports = getCaiso
