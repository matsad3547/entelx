const moment = require('moment-timezone')
const { getLmp } = require('../processes/getLmp')
const { getWeather } = require('../processes/getWeather')
const { utcFormat } = require('../config/')

const getCaiso = (req, res) => {

  const {
    startDate,
    endDate,
    timeZone,
    // TODO bring in lat lng from front end
  } = req.body

  const start = moment(startDate).tz(timeZone)
  const end = moment(endDate).tz(timeZone)

  const startUTC = start.format(utcFormat)
  const endUTC = end.format(utcFormat)

  console.log(start, end, '\nstart time at getCaiso:', startUTC, '\nend:', endUTC);

  const lat = 38.5816
  const lng = -121.4944

  Promise.all([
    getWeather(startDate, endDate, lat, lng),
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
