const knex = require('../knex')

const { convertObj } = require('../utils/').conversions

const {stdDevSelections} = require('../queries')

const getPriceRangeData = async (
  startDatetime,
  endDatetime,
  nodeId,
) => {
  try {
    const deviationsRes = await knex.raw(
      `SELECT
      ${stdDevSelections}
      FROM price_with_mvg_avg
      WHERE timestamp BETWEEN ? AND ? AND node_id = ?`, [startDatetime, endDatetime, nodeId])

    const [aboveStdDev, belowStdDev] = convertObj(deviationsRes[0][0])

    console.log({aboveStdDev}, {belowStdDev});
  }
  catch (err) {
    console.error(`Error getting the price range data for node ${nodeId} from ${startDatetime} to ${endDatetime}:`, err)
  }
}

module.exports = getPriceRangeData
