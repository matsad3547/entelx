const {
  readTableRows,
  getPriceAggregateData,
} = require('../db/')

const { getDBDatetime } = require('../utils/')

const getInsightData = async (req, res) => {

  const {
    startDate,
    endDate,
    id,
  } = req.params

  const [project] = await readTableRows('project', {id,})

  const { nodeId } = project

  const [startDatetime, endDatetime] = [startDate, endDate].map( iso => getDBDatetime(iso))

  const aggregate = await getPriceAggregateData(startDatetime, endDatetime, nodeId)

  return res.status(200).json({
    aggregate,
  })
}

module.exports = getInsightData
