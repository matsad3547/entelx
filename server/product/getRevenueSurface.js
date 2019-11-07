const {
  readTableRows,
  readTableRowsWhereBtw,
  getPriceAggregateData,
} = require('../db/')

const {
  getCenteredValuesArr,
  getTwoDimensionalArray,
  findRevenueAndCharge,
  getDBDatetime,
} = require('../utils/')

const getRevenueSurface = async (req, res) => {

  const {
    startDate,
    endDate,
    id,
  } = req.params

  const [project] = await readTableRows('project', {id,})

  const {
    nodeId,
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  } = project

  const datetimes = [startDate, endDate].map( iso => getDBDatetime(iso))

  const timeSeries = await readTableRowsWhereBtw('price', {nodeId,}, 'timestamp', datetimes)

  const options = {
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  }

  const aggregate = await getPriceAggregateData(startDate, endDate, nodeId)

  const {
    aboveStdDev,
    belowStdDev,
    aboveMean,
    belowMean,
  } = aggregate

  const aboveIncrement = aboveStdDev * .1
  const belowIncrement = belowStdDev * .1
  const aboveDistance = aboveStdDev * 3
  const belowDistance = belowStdDev * 3

  const xArr = getCenteredValuesArr(belowMean, belowIncrement, belowDistance)
  const zArr = getCenteredValuesArr(aboveMean, aboveIncrement, aboveDistance)

  const valArr = getTwoDimensionalArray(xArr, zArr)

  const charge = 0
  const revenue = 0

  const currentState = {
    charge,
    revenue,
  }

  const data = {
    timeSeries,
    aggregate,
  }

  const key = 'lmp'

  const points = valArr.map( arr => {
    const [x, z] = arr

    const { revenue } = findRevenueAndCharge(data, key, options, currentState, x, z)

    return {
      x,
      y: revenue,
      z,
    }
  })

  console.log('x axis length:', xArr.length, 'z axis length:', zArr.length);

  return res.status(200).json({
    revenueSurface: {
      points,
      axisLength: xArr.length,
    },
  })
}

module.exports = getRevenueSurface
