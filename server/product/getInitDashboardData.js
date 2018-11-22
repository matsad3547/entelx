const moment = require('moment-timezone')

const getDashboardData = require('./getDashboardData')

const { readTableRows } = require('../utils/')

const getInitDashboardData = (req, res) => {

  const { id } = req.body

  readTableRows('project', { id, })
    .then( projectRes => {

      const {
        lat,
        lng,
        node_id,
      } = projectRes[0]

      const projectName = projectRes[0].name
      const timeZone = projectRes[0].time_zone

      readTableRows('node', { id: node_id })
        .then( nodeRes => {

          const node = nodeRes[0]

          getDashboardData(
            lat,
            lng,
            timeZone,
            node,
          )
            .then( data => {
              return res.status(200).json({
                ...data,
                config: {
                  lat,
                  lng,
                  node,
                  projectName,
                  timeZone,
                },
              })
            })
        })
        .catch( err => { throw err })
    })
    .catch( err => {
      console.error('There was an error getting dashboard data', err)
      next(err)
    })
}

module.exports = getInitDashboardData
