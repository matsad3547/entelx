const moment = require('moment-timezone')

const { readTableRows } = require('../utils/')
const {
  getCurrentWeather,
  getPriceSeries,
  oasisEndpoint,
} = require('../processes/')

const getDashboardData = (req, res) => {

  const { id } = req.body

  readTableRows('project', { id, })
    .then( projectRes => {

      const {
        lat,
        lng,
        node_id,
      } = projectRes[0]

      const projectName = projectRes[0].name

      readTableRows('node', { id: node_id })
        .then( nodeRes => {

          const node = nodeRes[0]

          buildDashboardData(lat, lng, node)
            .then( data => {
              return res.status(200).json({
                ...data,
                config: {
                  lat,
                  lng,
                  node,
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

const buildDashboardData = (lat, lng, node) => {

  return Promise.all([
        getCurrentWeather(lat, lng),
        getPriceSeries(node),
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
