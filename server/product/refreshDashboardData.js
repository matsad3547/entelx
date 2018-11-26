const getDashboardData = require('./getDashboardData')

const {
  getCurrentWeather,
  getPriceSeries,
} = require('../processes/')

const refreshDashboardData = (req, res) => {

  const {
    lat,
    lng,
    timeZone,
    node,
  } = req.body

  getDashboardData(
      lat,
      lng,
      timeZone,
      node,
    )
    .then( data => res.status(200).json({ ...data, }) )
    .catch( err => {
      console.error('There was an error refreshing dashboard data:', err)
      next(err)
    })
}

module.exports = refreshDashboardData
