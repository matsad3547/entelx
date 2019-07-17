const moment = require('moment')

const {
  readTableRows,
  readTableRowsWhereBtw,
} = require('../db/')

const { findRevenueAndCharge } = require('../utils/')

const getRevenueByThresholds = async (req, res) => {

  const {
    chargeThreshold,
    dischargeThreshold,
    id,
  } = req.body

  const [project] = await readTableRows('project', {id,})

  const {
    nodeId,
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  } = project

  const getNow = () => moment()

  const endMillis = getNow().valueOf()
  const startMillis = getNow().clone()
    .subtract(7, 'days')
    .valueOf()

  const timeSeries = await readTableRowsWhereBtw('price', {nodeId,}, 'timestamp', [startMillis, endMillis])

  const batterySpecs = {
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  }

  const charge = 0
  const revenue = 0

  const currentState = {
    charge,
    revenue,
  }

  const key = 'lmp'

  const newVals = findRevenueAndCharge(timeSeries, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)

  return res.status(200).json({
    revenue: newVals.revenue,
  })
}

module.exports = getRevenueByThresholds
