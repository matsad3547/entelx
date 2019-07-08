const moment = require('moment')

const {
  readTableRows,
  readTableRowsWhereBtw,
} = require('../db/')

const { calculateInsightData } = require('../utils/')

const getRevenueByThresholds = async (req, res) => {

  const {
    chargeThreshold,
    dischargeThreshold,
    id,
  } = req.body

  const [project] = await readTableRows('project', {id,})

  const {
    nodeId,
    lat,
    lng,
    timeZone,
    power,
    energy,
    name,
  } = project

  const getNow = () => moment()

  const endMillis = getNow().valueOf()
  const startMillis = getNow().clone()
    .subtract(7, 'days')
    .valueOf()

  const [node] = await readTableRows('node', {id: nodeId})

  const timeSeries = await readTableRowsWhereBtw('price', {nodeId,}, 'timestamp', [startMillis, endMillis])

  const { aggregate } = calculateInsightData(timeSeries, 'lmp')

  return res.status(200).json({
    data: aggregate,
    timeSeries,
    config: {
      projectName: name,
      power,
      energy,
      lat,
      lng,
      timeZone,
      node,
      chargeThreshold,
      dischargeThreshold,
    }
  })
}

module.exports = getRevenueByThresholds
