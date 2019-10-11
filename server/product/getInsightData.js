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

  const { nodeId } = project

  const aggregate = await getPriceAggregateData(startMillis, endMillis, nodeId)

  return res.status(200).json({
    aggregate,
  })
}

module.exports = getInsightData
