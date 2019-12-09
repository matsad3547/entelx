const {
  readTableRows,
} = require('../db/').connections
const {
  getPriceRangeData,
} = require('../db/').queries

const { getDBDatetime } = require('../utils/')

const getPriceRanges = async (req, res, next) => {

  const {
    startDate,
    endDate,
    id,
  } = req.params

  const [project] = await readTableRows('project', {id,})

  if (!project) {
    return next(`Project ${id} is no longer available`)
  }

  const { nodeId } = project

  const [startDatetime, endDatetime] = [startDate, endDate].map( iso => getDBDatetime(iso))

  const priceRangeData = await getPriceRangeData(startDatetime, endDatetime, nodeId)

  return res.status(200).json({
    priceRangeData,
  })
}

module.exports = getPriceRanges
