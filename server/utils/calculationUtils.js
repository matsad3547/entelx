const d3 = require('d3-array')
// const fmin = require('fmin')
const { fiveMinsAsHour } = require('../config/')

// TODO mvgAvg Change utils to use a `mean` value from the `aggregate` portion of the data instead of `mvgAvg` that is added to the `timeSeries`

// TODO mvgAvg utils that use `mvgAvg`:
// 1. calculateScore

const composeData = (...fns) => (timeSeries, key, options) => {
  const res = {
    timeSeries,
    aggregate: {},
  }
  return fns.reduce( (v, f) => f(v, key, options), res)
}

const getSum = (a, b) => a + b

// TODO Replace with metrics query
const getMean = arr => arr.reduce(getSum, 0)/arr.length
// TODO Replace with metrics query
const getStdDev = (timeSeries, key, mean) => Math.sqrt(getMean(timeSeries.map( d => (d[key] - mean)**2 )))

// TODO Replace with metrics query
const getMinAndMax = (timeSeries, key) => timeSeries.reduce( (obj, d, i) =>  ({
  max: d[key] > obj.max ? d[key] : obj.max,
  min: d[key] < obj.min ? d[key] : obj.min,
}), {max: 0, min: Infinity})

// TODO Replace with metrics query
const calculateMean = (data, key) => {

  return {
    ...data,
    aggregate: {
      ...data.aggregate,
      mean: getMean(data.timeSeries.map( ts => ts[key])),
    }
  }
}

// TODO Delete - replaced
const calculateMovingAverage = (data, key, options) => {

  const { period } = options

  const { timeSeries } = data

  const calculation = timeSeries.reduce( (arr, d, i) => timeSeries[i - 1] ?
  [
    ...arr,
    {
      ...d,
      timestamp: d.timestamp,
      [key]: d[key],
      mvgAvg: timeSeries
        .slice(Math.max(0, i - (period - 1)), i + 1)
        .reduce( ([sum, n], obj, i, arr) =>
          i !== (arr.length - 1) ?
          [sum + obj[key], n + 1] :
          (sum + obj[key])/(n + 1)
          , [0, 0]),
    }
  ] : arr, [])

  return {
    ...data,
    timeSeries: calculation,
  }
}

// TODO Delete - replaced
const calculateScore = (data, key) => {

  const { timeSeries } = data

  const calculation = timeSeries.map( (d, i) => {
    let score = (d[key] - d.mvgAvg) / d.mvgAvg

    if(score > 9990) {
      console.log(`Calculated score is out of range: ${score} from data ${JSON.stringify(d)}`)
      score = 9990
    }

    return {
      ...d,
      score,
    }
  })

  return {
    ...data,
    timeSeries: calculation,
  }
}

const calculateArbitrage = (data, key, options) => {

  const {
    chargeThreshold,
    dischargeThreshold,
  } = options

  const {
    timeSeries,
    aggregate,
  } = data

  const calculation = timeSeries.reduce( (obj, d, i) => i < timeSeries.length - 1 ?
    {
      chargeVol: {
        prcSum: d.score < - chargeThreshold ?
        obj.chargeVol.prcSum + d[key] :
        obj.chargeVol.prcSum,
        n: d.score < - chargeThreshold ?
        obj.chargeVol.n + 1 :
        obj.chargeVol.n,
      },
      dischargeVol: {
        prcSum: d.score > dischargeThreshold ?
        obj.dischargeVol.prcSum + d[key] :
        obj.dischargeVol.prcSum,
        n: d.score > dischargeThreshold ?
        obj.dischargeVol.n + 1 :
        obj.dischargeVol.n,
      },
    } :
    {
      chargeVol: {
        avgPrc: d.score < - chargeThreshold ?
        (obj.chargeVol.prcSum + d[key]) / (obj.chargeVol.n + 1) :
        obj.chargeVol.prcSum / obj.chargeVol.n,
        n: d.score < - chargeThreshold ?
        obj.chargeVol.n + 1 :
        obj.chargeVol.n,
      },
      dischargeVol: {
        avgPrc: d.score > dischargeThreshold ?
        (obj.dischargeVol.prcSum + d[key]) / (obj.dischargeVol.n + 1) :
        obj.dischargeVol.prcSum / obj.dischargeVol.n,
        n: d.score > dischargeThreshold ?
        obj.dischargeVol.n + 1 :
        obj.dischargeVol.n,
      },
    },
    {
      chargeVol: {
        prcSum: 0,
        n: 0,
      },
      dischargeVol: {
        prcSum: 0,
        n: 0,
      },
    }
  )

  return {
    ...data,
    aggregate: {
      ...aggregate,
      ...calculation,
    },
  }
}

const findMinMax = (data, key) => {

  const {
    timeSeries,
    aggregate,
  } = data

  const calculation = getMinAndMax(timeSeries, key)

  return {
    ...data,
    aggregate: {
      ...aggregate,
      ...calculation,
    }
  }
}

const findInflections = (data, key) => {

  const {
    timeSeries,
    aggregate,
  } = data

  const calculation = timeSeries.reduce( (agr, obj) => {
    const sign = Math.sign(obj.score)

    return agr.sign !== sign ?
      {
        inflections: [...agr.inflections, obj.timestamp],
        sign,
      }: agr
  }, {
    inflections: [],
    sign: 0,
  })

  return {
    ...data,
    aggregate: {
      ...aggregate,
      inflections: calculation.inflections,
    }
  }
}

const findRevenueAndCharge = (
  data,
  key,
  batterySpecs,
  currentState,
  chargeThreshold,
  dischargeThreshold,
) => {

  const { timeSeries } = data

  const {
    power,
    energy,
    rte,
    chargeBuffer,
    dischargeBuffer,
  } = batterySpecs

  const chargeEnergy = power * fiveMinsAsHour

  const maxEnergy = (1 - chargeBuffer) * energy

  const minEnergy = dischargeBuffer * energy

  return timeSeries.reduce( (agg, ts) => {

    const canCharge = agg.charge + chargeEnergy <= maxEnergy

    const canDischarge = agg.charge - chargeEnergy >= minEnergy

    const charge = canCharge && ts[key] < chargeThreshold

    const discharge = canDischarge && ts[key] > dischargeThreshold

    if (charge) {
      return {
        charge: agg.charge + chargeEnergy,
        revenue: agg.revenue - (ts[key] * chargeEnergy),
        status: 'charge',
      }
    }
    else if (discharge) {
      return {
        charge: agg.charge - chargeEnergy,
        revenue: agg.revenue + (ts[key] * rte * chargeEnergy),
        status: 'discharge',
      }
    }
    else {
      return {
        ...agg,
        status: 'standby',
      }
    }
  }, currentState)
}

const findAggregateRevenue = (data, key, options) => {

  const { aggregate } = data

  const {
    dischargeThreshold,
    chargeThreshold,
  } = aggregate

  const {
    energy,
    dischargeBuffer,
  } = options

  const initEnergy = dischargeBuffer * energy

  const initState = {
    charge: initEnergy,
    revenue: 0,
  }

  const calculation = (dischargeThreshold, chargeThreshold) => findRevenueAndCharge(data, key, options, initState, dischargeThreshold, chargeThreshold)

  return {
    ...data,
    aggregate: {
      ...aggregate,
      ...calculation(dischargeThreshold, chargeThreshold),
    }
  }
}

const findThresholds = (data, key, options) => {
  console.time('findThresholds')

  const { aggregate } = data

  const {
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  } = options

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

  const batterySpecs = {
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  }

  //for calculating initial thresholds
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

  const maxPoint = d3.least(points, (a, b) => b.y - a.y)

  console.timeEnd('findThresholds')

  return {
    ...data,
    aggregate: {
      ...data.aggregate,
      chargeThreshold: maxPoint.x,
      dischargeThreshold: maxPoint.z,
    }
  }
}

const findStdDev = (data, key) => {

  const {
    timeSeries,
    aggregate,
  } = data

  const mean = getMean(timeSeries.map( d => d[key] ))

  return {
    ...data,
    aggregate: {
      ...aggregate,
      stdDev: getStdDev(timeSeries, key, mean),
    }
  }
}

// TODO Replace with metrics query
const findUpperAndLowerValues = (data, key) => {
  const {
    timeSeries,
    aggregate,
  } = data

  const { mean } = aggregate

  const above = timeSeries.filter( d => d[key] > mean )

  const aboveMean = getMean(above.map( d => d[key] ))

  const aboveMinMax = getMinAndMax(above, key)

  const below = timeSeries.filter( d => d[key] < mean )

  const belowMean = getMean(below.map( d => d[key] ))

  const belowMinMax = getMinAndMax(below, key)

  return {
    ...data,
    aggregate: {
      ...aggregate,
      aboveStdDev: getStdDev(above, key, aboveMean),
      belowStdDev: getStdDev(below, key, belowMean),
      aboveMean,
      belowMean,
      aboveMax: aboveMinMax.max,
      aboveMin: aboveMinMax.min,
      belowMax: belowMinMax.max,
      belowMin: belowMinMax.min,
      aboveN: above.length,
      belowN: below.length,
    }
  }
}

const getCenteredValuesArr = (center, increment, distance) => {
  const start = center - distance
  const end = center + distance

  let arr = [start]

  const iterate = arr => {

    if (arr[arr.length - 1] < end) {
      arr.push(arr[arr.length - 1] + increment)
      iterate(arr)
    }
    else {
      return arr
    }
  }
  iterate(arr)
  return arr
}

const getTwoDimensionalArray = (xArr, yArr) => xArr.flatMap( xVal => yArr.map( yVal => [xVal, yVal]))

const calculateScoreData = composeData(
  calculateMovingAverage,
  calculateScore,
)

const calculateDerivedData = composeData(
  calculateMean,
  findInflections,
  findStdDev,
  findUpperAndLowerValues,
  findThresholds,
)

module.exports = {
  composeData,
  calculateMovingAverage,
  calculateScore,
  calculateArbitrage,
  calculateScoreData,
  findMinMax,
  findInflections,
  findRevenueAndCharge,
  findAggregateRevenue,
  findThresholds,
  findStdDev,
  calculateDerivedData,
  findUpperAndLowerValues,
  getCenteredValuesArr,
  getTwoDimensionalArray,
  calculateMean,
}
