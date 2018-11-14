const { readTableRows } = require('../utils/')
const { getCurrentWeather } = require('../processes/')

const getDashboardData = (req, res) => {
  const { id } = req.body

  readTableRows('project', { id, })
    .then( project => {

      const {
        lat,
        lng,
        node_id,
      } = project[0]

      readTableRows('node', { id: node_id })
        .then( node => {

          // get weather based on latLng
          // get currentAvg from from node
          // get last hour of price data from CAISO
          Promise.all([
            getCurrentWeather(lat, lng)
          ])
            .then( arr => {
              const weather = arr.find( obj => obj.currently !== undefined )
              return res.status(200).json({
                weather: weather.currently,
              })
            })
            .catch( err => {
              if (err) throw new Error(err)
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

module.exports = getDashboardData
