const moment = require('moment-timezone')

const { readTableRows } = require('../utils/')
const {
  getCurrentWeather,
  caisoPriceRequest,
} = require('../processes/')

const getDashboardData = (req, res) => {

  const { id } = req.body

  readTableRows('project', { id, })
    .then( project => {

      const {
        lat,
        lng,
        node_id,
      } = project[0]

      const projectName = project[0].name

      readTableRows('node', { id: node_id })
        .then( node => {

          const {
            name,
            avg,
          } = node[0]

          buildDashboardData(lat, lng, name)
            .then( data => {
              return res.status(200).json({
                ...data,
                config: {
                  lat,
                  lng,
                  avg,
                  nodeName: name,
                  projectName,
                },
              })
            })
        })
        .catch( err => {
          if (err) throw new Error(err)
        })
    })
    .catch( err => {
      console.error(`There was an error getting dashboard data for project ${id}: ${err}`)
    })
}

const buildDashboardData = (lat, lng, nodeName) => new Promise( (resolve, reject) => {

  const timeZone = 'America/Los_Angeles'
  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
                        .subtract(1, 'hour')
                        .valueOf()

  Promise.all([
    getCurrentWeather(lat, lng),
    caisoPriceRequest(
      startMillis,
      endMillis,
      'PRC_INTVL_LMP',
      'RTM',
      nodeName),
    ])
    .then( data => resolve({
        weather: data[0],
        prices: data[1],
      })
    )
    .catch(reject)
})

module.exports = getDashboardData
