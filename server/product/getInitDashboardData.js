const moment = require('moment-timezone')

const getDashboardData = require('./getDashboardData')

const { readTableRows } = require('../utils/')

const getInitDashboardData = (req, res) => {

  const { id } = req.body

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
      } = project

      const projectName = project.name

      return readTableRows(
          'node',
          { id: nodeId },
        )
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

module.exports = getInitDashboardData
