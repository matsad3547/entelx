const knex = require('../knex')

const { convertObj } = require('../utils/').conversions

const {aggregatesSelection} = require('../queryStrings')

const getPriceAggregateData = async (
  startDatetime,
  endDatetime,
  nodeId,
) => {
  try {
    const res = await knex.raw(
      `SELECT
      ${aggregatesSelection}
      FROM price_with_mvg_avg
      WHERE timestamp BETWEEN ? AND ? AND node_id = ?`, [startDatetime, endDatetime, nodeId])

    return convertObj(res[0][0])
  }
  catch (err) {
    console.error(`Error getting the price aggregate data for node ${nodeId} from ${startDatetime} to ${endDatetime}:`, err)
  }
}

module.exports = getPriceAggregateData
