const moment = require('moment-timezone')
const { getLmp } = require('../processes/getLmp')
const { getHistoricalWeather } = require('../processes/getHistoricalWeather')

const getCaiso = (req, res) => {

  const {
    startDate,
    endDate,
    timeZone,
    // TODO bring in lat lng from front end
  } = req.body

  console.log('start: ', startDate, ', end: ', endDate)

  const start = moment.tz(startDate, timeZone)
  const end = moment.tz(endDate, timeZone)

  const lat = 38.5816
  const lng = -121.4944

  Promise.all([
    getHistoricalWeather(start, end, lat, lng),
    getLmp(start, end, 'CAISO')
  ])
  .then( data => data.reduce( (agr, arr) => [...agr, ...arr] )
    .sort( (a, b) => a.timestamp - b.timestamp )
      // TODO add reduce step to combine data with the same timestamp
  )
  .then( parsed => res.json(parsed) )
  .catch( err => console.error('Error getting CAISO data:', err) )
}

module.exports = getCaiso
