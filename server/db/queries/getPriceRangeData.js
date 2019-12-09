const knex = require('../knex')

const { convertObj } = require('../utils/').conversions

const {stdDevSelections} = require('../queryStrings')

const getPriceRangesSelectionString = (aboveStdDev, belowStdDev) => `
  SUM(CASE WHEN lmp BETWEEN mvg_avg AND mvg_avg + ${aboveStdDev} THEN 1 ELSE 0 END) AS within_one_sigma_above,
  SUM(CASE WHEN lmp BETWEEN mvg_avg + ${aboveStdDev} AND mvg_avg + 2 * ${aboveStdDev} THEN 1 ELSE 0 END) AS above_one_sigma,
  SUM(CASE WHEN lmp BETWEEN mvg_avg + 2 * ${aboveStdDev} AND mvg_avg + 3 * ${aboveStdDev} THEN 1 ELSE 0 END) AS above_two_sigma,
  SUM(CASE WHEN lmp > mvg_avg + 3 * ${aboveStdDev} THEN 1 ELSE 0 END) AS above_three_sigma,
  SUM(CASE WHEN lmp BETWEEN mvg_avg - ${belowStdDev} AND mvg_avg THEN 1 ELSE 0 END) AS within_one_sigma_below,
  SUM(CASE WHEN lmp BETWEEN mvg_avg - (2 * ${belowStdDev}) AND mvg_avg - ${belowStdDev} THEN 1 ELSE 0 END) AS below_one_sigma,
  SUM(CASE WHEN lmp BETWEEN mvg_avg - (3 * ${belowStdDev}) AND mvg_avg - (2 * ${belowStdDev}) THEN 1 ELSE 0 END) AS below_two_sigma,
  SUM(CASE WHEN lmp < mvg_avg - (3 * ${belowStdDev}) THEN 1 ELSE 0 END) AS below_three_sigma
  `

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

    const {
      aboveStdDev,
      belowStdDev,
    } = convertObj(deviationsRes[0][0])

    const priceRangesRes = await knex.raw(
      `SELECT
      ${getPriceRangesSelectionString(aboveStdDev, belowStdDev)}
      FROM price_with_mvg_avg
      WHERE timestamp BETWEEN ? AND ? AND node_id = ?`, [startDatetime, endDatetime, nodeId])

    const priceRanges = convertObj(priceRangesRes[0][0])

    return {
      ...priceRanges,
      aboveStdDev,
      belowStdDev,
    }
  }
  catch (err) {
    console.error(`Error getting the price range data for node ${nodeId} from ${startDatetime} to ${endDatetime}:`, err)
  }
}

module.exports = getPriceRangeData
