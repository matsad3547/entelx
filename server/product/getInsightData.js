const {
  readTableRows,
  readTableRowsWhereBtw,
  getPriceAggregateData,
} = require('../db/')

const {
  getCenteredValuesArr,
  getTwoDimensionalArray,
  findRevenueAndCharge,
} = require('../utils/')

const getInsightData = async (req, res) => {

  const {
    startMillis,
    endMillis,
    id,
  } = req.body

  const [project] = await readTableRows('project', {id,})

  const {
    nodeId,
    lat,
    lng,
    timeZone,
    power,
    energy,
    name,
    chargeThreshold,
    dischargeThreshold,
    rte,
    dischargeBuffer,
    chargeBuffer,
  } = project

  const [node] = await readTableRows('node', {id: nodeId})

  const timeSeries = await readTableRowsWhereBtw('price', {nodeId,}, 'timestamp', [startMillis, endMillis])

  const options = {
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  }

  const aggregate = await getPriceAggregateData(startMillis, endMillis)

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
    aggregate,
    data: {
      points,
      axisLength: xArr.length,
    },
    config: {
      projectName: name,
      power,
      energy,
      lat,
      lng,
      timeZone,
      node,
      chargeThreshold,
      dischargeThreshold,
    }
  })
}

module.exports = getInsightData
