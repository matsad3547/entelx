const {
  readTableRows,
} = require('../db/').connections
const {
  getPriceRangeDataBySlice,
} = require('../db/').queries

const { getDBDatetime } = require('../utils/')

const getPriceRangesBySlice = async (req, res, next) => {

  const {
    startDate,
    endDate,
    id,
    slice,
  } = req.params

  const [project] = await readTableRows('project', {id,})

  if (!project) {
    return next(`Project ${id} is no longer available`)
  }

  const {
    nodeId,
    timeZone,
  } = project

  const [startDatetime, endDatetime] = [startDate, endDate].map( iso => getDBDatetime(iso))

  const priceRangesBySlice = await getPriceRangeDataBySlice(startDatetime, endDatetime, nodeId, slice, timeZone)

  console.log({priceRangesBySlice});

  return res.status(200).json({
    priceRangesBySlice,
  })
}

module.exports = getPriceRangesBySlice
