const knex = require('../knex')

const { convertObj } = require('../utils/').conversions

const {
  stdDevSelections,
  getPriceRangesSelectionString,
} = require('../queryStrings')

const getGroupByString = (slice, timeZone) => {
  console.log('slice in group by', slice);

  switch (slice) {
    case 'day':
      return `GROUP BY DAYOFWEEK(CONVERT_TZ(TIMESTAMP, 'UTC', '${timeZone}'))`

    case 'hour':
      return `GROUP BY HOUR(CONVERT_TZ(TIMESTAMP, 'UTC', '${timeZone}'))`

    case 'month':
      return `GROUP BY MONTH(CONVERT_TZ(TIMESTAMP, 'UTC', '${timeZone}'))`

    default:
      return `GROUP BY DAYOFWEEK(CONVERT_TZ(TIMESTAMP, 'UTC', '${timeZone}'))`
  }
}

const getPriceRangeDataBySlice = async (
  startDatetime,
  endDatetime,
  nodeId,
  slice = 'day',
  timeZone = 'America/Los_Angeles',
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

    const bySliceRes = await knex.raw(
      `SELECT
      ${getPriceRangesSelectionString(aboveStdDev, belowStdDev)}
      FROM price_with_mvg_avg
      WHERE timestamp BETWEEN ? AND ? AND node_id = ?
      ${getGroupByString(slice, timeZone)}
      `, [startDatetime, endDatetime, nodeId])

    const priceRangesBySlice = Object.keys(bySliceRes[0]).reduce( (bySliceObj, key) => ({
      ...bySliceObj,
      [key]: convertObj(bySliceRes[0][key])
    }), {})

    return {
      ...priceRangesBySlice,
      aboveStdDev,
      belowStdDev,
    }
  }
  catch (err) {
    console.error(`Error getting the price range data by ${slice} for node ${nodeId} from ${startDatetime} to ${endDatetime}:`, err)
  }
}

module.exports = getPriceRangeDataBySlice
