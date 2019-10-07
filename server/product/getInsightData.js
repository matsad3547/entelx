const {
  readTableRows,
  getPriceAggregateData,
} = require('../db/')

const getInsightData = async (req, res) => {

  const {
    startMillis,
    endMillis,
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

  const aggregate = await getPriceAggregateData(startMillis, endMillis)

  return res.status(200).json({
    aggregate,
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
