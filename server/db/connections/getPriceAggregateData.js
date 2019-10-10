const knex = require('../knex')
const { convertObj } = require('../utils/').conversions

const getPriceAggregateData = (
  startMillis,
  endMillis,
) => knex.raw(
    `SELECT
      node_id,
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
    WHERE timestamp BETWEEN ? AND ?
    GROUP BY node_id`, [startMillis, endMillis])
  .then( res => convertObj(res[0][0]) )
  .catch( err => console.error(`Error getting the price aggregate data from ${startMillis} to ${endMillis}:`, err))

module.exports = getPriceAggregateData
