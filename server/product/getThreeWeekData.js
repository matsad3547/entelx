const moment = require('moment-timezone')

const getHistoricalData = require('./getHistoricalData')

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

          return getHistoricalData(
              lat,
              lng,
              timeZone,
              node,
              21,
            )
            .then( data => res.status(200).json({...data}) )
        })
        .catch( err => { throw err })
    })
    .catch( err => {
      console.error('There was an error getting 3 week data', err)
      next(err)
    })
}

module.exports = getThreeWeekData
