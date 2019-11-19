const knex = require('../knex')

const { convertObj } = require('../utils/').conversions

const getPriceAggregateData = async (
  startDatetime,
  endDatetime,
  nodeId,
) => {
  try {
    const res = await knex.raw(
      `SELECT
      SUM(CASE WHEN lmp > mvg_avg THEN 1 ELSE 0 END) AS above_n,
      AVG(CASE WHEN lmp > mvg_avg THEN lmp END) AS above_mean,
      MAX(CASE WHEN lmp > mvg_avg THEN lmp END) AS above_max,
      MIN(CASE WHEN lmp > mvg_avg THEN lmp END) AS above_min,
      STD(CASE WHEN lmp > mvg_avg THEN lmp END) AS above_std_dev,
      SUM(CASE WHEN lmp < mvg_avg THEN 1 ELSE 0 END) AS below_n,
      AVG(CASE WHEN lmp < mvg_avg THEN lmp END) AS below_mean,
      MAX(CASE WHEN lmp < mvg_avg THEN lmp END) AS below_max,
      MIN(CASE WHEN lmp < mvg_avg THEN lmp END) AS below_min,
      STD(CASE WHEN lmp < mvg_avg THEN lmp END) AS below_std_dev
      FROM price_with_mvg_avg
      WHERE timestamp BETWEEN ? AND ? AND node_id = ?`, [startDatetime, endDatetime, nodeId])

    return convertObj(res[0][0])
  }
  catch (err) {
    console.error(`Error getting the price aggregate data for node ${nodeId} from ${startDatetime} to ${endDatetime}:`, err)
  }
}

module.exports = getPriceAggregateData
