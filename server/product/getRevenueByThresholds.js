const moment = require('moment')

const {
  readTableRows,
  readTableRowsWhereBtw,
} = require('../db/')

const {
  findRevenueAndCharge,
  getDBDatetime, 
} = require('../utils/')

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

  const now = moment()
  const end = now.toISOString()
  const start = now.clone()
    .subtract(7, 'days')
    .toISOString()

  const datetimes = [start, end].map( iso => getDBDatetime(iso))

  const timeSeries = await readTableRowsWhereBtw('price', {nodeId,}, 'timestamp', datetimes)

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

  const data = {
    timeSeries,
  }

  const newVals = findRevenueAndCharge(data, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)

  return res.status(200).json({
    revenue: newVals.revenue,
  })
}

module.exports = getRevenueByThresholds
