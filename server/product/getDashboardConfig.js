const moment = require('moment-timezone')

const getDashboardData = require('./getDashboardData')

const { readTableRows } = require('../db/')

const getDashboardConfig = (req, res) => {

  const { id } = req.params

  return readTableRows('project', { id, })
    .then( projectRes => {

      const project = projectRes[0]

      const {
        lat,
        lng,
        nodeId,
        timeZone,
        chargeThreshold,
        dischargeThreshold,
        energy,
      } = project

      const projectName = project.name

      return res.status(200).json({
        config: {
          lat,
          lng,
          nodeId,
          projectName,
          timeZone,
          chargeThreshold,
          dischargeThreshold,
          energy,
        },
      })
    })
    .catch( err => {
      console.error('There was an error getting dashboard data', err)
      next(err)
    })
}

module.exports = getDashboardConfig
