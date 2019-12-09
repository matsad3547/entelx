// const moment = require('moment-timezone')

const {
  readTableRows,
  readTableRowsWhereBtw,
} = require('../db/').connections

const { getDBDatetime } = require('../utils/')
//
// const {
//   aggregateHistoricalWeather,
// } = require('../processes/')

const getHistoricalData = async (req, res, next) => {

  const {
    endDate,
    startDate,
    id,
    // includeWeather, TODO Make this work
  } = req.params

  const [project] = await readTableRows('project', {id,})

  if (!project) {
    return next(`Project ${id} is no longer available`)
  }

  const {
    nodeId,
  } = project

  const datetimes = [startDate, endDate].map( isoString => getDBDatetime(isoString) )

  const timeseries = await readTableRowsWhereBtw('price_with_score', {nodeId,}, 'timestamp', datetimes)

  return res.status(200).json({
    timeseries,
  })

  // TODO save this function - it syncs timeseries data

    // const combinedData = [processedData.timeSeries, data[1]]
    //   .reduce( (agg, d) => d.error ? agg : [...agg, ...d], [])
    //   .sort( (a, b) => a.timestamp - b.timestamp )
    //   .reduce( (agr, obj, i) =>
    //     i > 0 && obj.timestamp === agr[agr.length - 1].timestamp ?
    //     [
    //       ...agr.slice(0, agr.length - 1),
    //       {
    //         ...agr[agr.length - 1],
    //         ...obj,
    //       },
    //     ]:
    //     [
    //       ...agr,
    //       obj,
    //     ], [])

}

module.exports = getHistoricalData
