const {
  getPriceAggregateData,
} = require('../db/')

const getInsightData = async (req, res) => {

  const {
    startMillis,
    endMillis,
    // id,
  } = req.body


  // TODO node id will eventually be needed to select the insights from the correct node

  // const [project] = await readTableRows('project', {id,})
  //
  // const { nodeId } = project

  const aggregate = await getPriceAggregateData(startMillis, endMillis)

  return res.status(200).json({
    aggregate,
  })
}

module.exports = getInsightData
