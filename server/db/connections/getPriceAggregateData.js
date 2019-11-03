const knex = require('../knex')

const { convertObj } = require('../utils/').conversions
const { getDBDatetime } = require('../../utils/')

const getPriceAggregateData = (
  startDate,
  endDate,
  nodeId,
) => {

  const startDatetime = getDBDatetime(startDate)
  const endDatetime = getDBDatetime(endDate)

  return knex.raw(
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
    GROUP BY node_id`, [startDatetime, endDatetime])
    .then( res => {
      const [key] = Object.keys(res[0]).filter( k => res[0][k].node_id === nodeId )

      return convertObj(res[0][key])
    })
    .catch( err => console.error(`Error getting the price aggregate data from ${startDatetime} to ${endDatetime}:`, err))
}

module.exports = getPriceAggregateData
