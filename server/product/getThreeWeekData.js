const moment = require('moment-timezone')

const getDashboardData = require('./getDashboardData')

const { readTableRows } = require('../utils/')

const getThreeWeekData = (req, res) => {

  const { id } = req.body

  readTableRows('project', { id, })
    .then( projectRes => {

      const project = projectRes[0]

      const {
        lat,
        lng,
        node_id,
      } = project

      const projectName = project.name
      const timeZone = project.time_zone
      const chargeThreshold = project.charge_threshold
      const dischargeThreshold = project.discharge_threshold


      return readTableRows('node', { id: node_id })
        .then( nodeRes => {

          const node = nodeRes[0]

          return getDashboardData(
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
                  chargeThreshold,
                  dischargeThreshold,
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

module.exports = getThreeWeekData
