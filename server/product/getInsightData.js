const {
  readTableRows,
  readTableRowsWhereBtw,
} = require('../db/')

const {
  calculateInsightData,
  getCenteredValuesArr,
  getTwoDimensionalArray,
  findRevenueAndCharge,
} = require('../utils/')

const getInsightData = async (req, res) => {

  const {
    endMillis,
    startMillis,
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

  const data = calculateInsightData(timeSeries, 'lmp')

  const { aggregate } = data

  const {
    aboveStdDev,
    belowStdDev,
    aboveMean,
    belowMean,
  } = aggregate

  const aboveIncrement = aboveStdDev * .2
  const belowIncrement = belowStdDev * .2
  const aboveDistance = aboveStdDev * 3
  const belowDistance = belowStdDev * 3

  const xArr = getCenteredValuesArr(aboveMean, aboveIncrement, aboveDistance)
  const zArr = getCenteredValuesArr(belowMean, belowIncrement, belowDistance)

  const valArr = getTwoDimensionalArray(xArr, zArr)

  const key = 'lmp'

  const batterySpecs = {
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  }

  const charge = 0
  const revenue = 0

  const currentState = {
    charge,
    revenue,
  }

  const points = valArr.map( arr => {
    const [x, z] = arr

    const { revenue } = findRevenueAndCharge(data, key, batterySpecs, currentState, x, z)

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
