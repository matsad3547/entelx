const moment = require('moment-timezone')

const { readTableRows } = require('../utils/')
const {
  getCurrentWeather,
  oasisEndpoint,
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
        .catch( err => { throw err })
    })
    .catch( err => {
      console.error(err.stack)
      res.status(500).send('There was an error getting dashboard data', err)
    })
}

const buildDashboardData = (lat, lng, nodeName) => {

  const timeZone = 'America/Los_Angeles'
  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
                        .subtract(1, 'hour')
                        .valueOf()

  return Promise.all([
    getCurrentWeather(lat, lng),
    oasisEndpoint(
        'PRC_INTVL_LMP',
        'RTM',
        startMillis,
        endMillis,
        nodeName),
      ]
      .map( p => p.catch(handleMultiPromiseError) )
    )
    .then( data => ({
        weather: data[0],
        prices: data[1],
      })
    )
}

const handleMultiPromiseError = err => {
  console.error(`there was an error: ${err}`)
  return { error: `there was an error: ${err}`}
}

module.exports = getDashboardData
