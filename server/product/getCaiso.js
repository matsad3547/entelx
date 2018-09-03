const format = require('date-fns/format')
const { getLmp } = require('../processes/getLmp')
const { getWeather } = require('../processes/getWeather')
const { utcFormat } = require('../config/')

const getCaiso = (req, res) => {

  const {
    startDate,
    endDate,
    // TODO bring in lat lng from front end
  } = req.body

  const start = new Date(startDate)
  const end = new Date(endDate)

  // const startUTC = format(start, utcFormat)
  // const endUTC = format(end, utcFormat)

  const startUTC = start.toISOString()
  const endUTC = end.toISOString()

  console.log('start time at getCaiso:', startUTC, '\nend:', endUTC);

  const lat = 38.5816
  const lng = -121.4944

  Promise.all([
    // getWeather(startDate, endDate, lat, lng),
    getLmp(startUTC, endUTC)
  ])
  .then( data => res.json(
    data.reduce( (agr, arr) => [...agr, ...arr] )
      .sort( (a, b) => a.timestamp - b.timestamp )
    )
  )
  .catch( err => console.error('Error getting CAISO data:', err) )

}

module.exports = getCaiso
