const {
  readTableRows,
  readTableRowsWhereBtw,
} = require('../db/')

const { calculateInsightData } = require('../utils/')

const getInsightData = async (req, res) => {

  const {
    endMillis,
    startMillis,
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
    chargeThreshold,
    dischargeThreshold,
  } = project

  const [node] = await readTableRows('node', {id: nodeId})

  const timeSeries = await readTableRowsWhereBtw('price', {nodeId,}, 'timestamp', [startMillis, endMillis])

  const { aggregate } = calculateInsightData(timeSeries, 'lmp')

  const {
    aboveStdDev,
    belowStdDev,
    aboveMean,
    belowMean,
    aboveMax,
    aboveMin,
    belowMax,
    belowMin,
    aboveN,
    belowN,
  } = aggregate

  return res.status(200).json({
    aggregate,
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

module.exports = getInsightData