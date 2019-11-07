const {
  readTableRows,
  getPriceAggregateData,
} = require('../db/')

const getInsightData = async (req, res) => {

  const {
    startDate,
    endDate,
    id,
  } = req.params

  const [project] = await readTableRows('project', {id,})

  const { nodeId } = project

  const aggregate = await getPriceAggregateData(startDate, endDate, nodeId)

  return res.status(200).json({
    aggregate,
  })
}

module.exports = getInsightData
