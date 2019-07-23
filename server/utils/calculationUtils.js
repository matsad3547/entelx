const optimize = require('optimization-js')
const fmin = require('fmin')
const { fiveMinsAsHour } = require('../config/')

// TODO mvgAvg Change utils to use a `mean` value from the `aggregate` portion of the data instead of `mvgAvg` that is added to the `timeSeries`

// TODO mvgAvg utils that use `mvgAvg`:
// 1. calculateScore
// 2. findRevenueAndCharge
// 3. findUpperAndLowerValues

const composeData = (...fns) => (data, key, options) => {
  const res = {
    timeSeries: data,
    aggregate: {},
  }
  return fns.reduce( (v, f) => f(v, key, options), res)
}

const getSum = (a, b) => a + b

const getMean = arr => arr.reduce(getSum)/arr.length

const getStdDev = (timeSeries, key, mean) => Math.sqrt(getMean(timeSeries.map( d => (d[key] - mean)**2 )))

const getMinAndMax = (timeSeries, key) => timeSeries.reduce( (obj, d, i) =>  ({
  max: d[key] > obj.max ? d[key] : obj.max,
  min: d[key] < obj.min ? d[key] : obj.min,
}), {max: 0, min: Infinity})

const calculateMean = (data, key) => {

  return {
    ...data,
    aggregate: {
      ...data.aggregate,
      mean: getMean(data.timeSeries.map( ts => ts[key])),
    }
  }
}

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

const calculateScore = (data, key) => {

  const { timeSeries } = data

  const calculation = timeSeries.map( d => ({
      ...d,
      score: (d[key] - d.mvgAvg) / d.mvgAvg,
    })
  )

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
  timeSeries, //array
  key,
  batterySpecs,
  currentState,
  dischargeThreshold,
  chargeThreshold,
) => {

  const {
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  } = batterySpecs

  const chargeEnergy = power * fiveMinsAsHour

  const maxEnergy = (1 - chargeBuffer) * energy

  const minEnergy = dischargeBuffer * energy

  return timeSeries.reduce( (agg, ts) => {

    const canCharge = agg.charge + chargeEnergy <= maxEnergy

    const canDischarge = agg.charge - chargeEnergy >= minEnergy

    const charge = canCharge && ts[key] < ts.mvgAvg - chargeThreshold

    const discharge = canDischarge && ts[key] > ts.mvgAvg + dischargeThreshold

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

  const {
    timeSeries,
    aggregate,
  } = data

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

  const calculation = (dischargeThreshold, chargeThreshold) => findRevenueAndCharge(timeSeries, key, options, initState, dischargeThreshold, chargeThreshold)

  return {
    ...data,
    aggregate: {
      ...aggregate,
      ...calculation(dischargeThreshold, chargeThreshold),
    }
  }
}

const findThresholds = (data, key, options) => {

  const {
    timeSeries,
    aggregate,
  } = data

  const {
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  } = options

  // This function assumes 5 minute timeSeries data
  const fiveMinsAsHour = 5 / 60
  const chargeEnergy = power * fiveMinsAsHour

  const maxEnergy = (1 - chargeBuffer) * energy

  const minEnergy = dischargeBuffer * energy

  const calculation = (dischargeThreshold, chargeThreshold) => timeSeries.reduce( (obj, d, i) => {

    // console.log('at findThresholds?', obj.revenue + '$', i, dischargeThreshold, chargeThreshold);

    const canCharge = obj.charge + chargeEnergy <= maxEnergy

    const canDischarge = obj.charge - chargeEnergy >= minEnergy

    const charge = canCharge && d[key] < d.mvgAvg - chargeThreshold

    const discharge = canDischarge && d[key] > d.mvgAvg + dischargeThreshold

    if (charge) {
      return {
        charge: obj.charge + chargeEnergy,
        revenue: obj.revenue - (d[key] * chargeEnergy),
      }
    }
    else if (discharge) {
      return {
        charge: obj.charge - chargeEnergy,
        revenue: obj.revenue + (d[key] * rte * chargeEnergy),
      }
    }
    else {
      return obj
    }
  }, {
    charge: minEnergy,
    revenue: 0,
  })

  const maxThreshold = timeSeries[timeSeries.length - 1].mvgAvg

  // const initThresholdVal = maxThreshold / 2
  const initThresholdVal = 0

  console.log('max threshold:', maxThreshold);

  const forOptimization = ([c, d]) => -(calculation(c, d).revenue)

  // const optimizedThresholds = optimize.minimize_Powell(forOptimization, [initThresholdVal, initThresholdVal])

  const optimizedThresholds = fmin.nelderMead(forOptimization, [initThresholdVal, initThresholdVal])

  console.log(optimizedThresholds);

  return {
    ...data,
    aggregate: {
      ...aggregate,
      dischargeThreshold: optimizedThresholds.argument[0],
      chargeThreshold: optimizedThresholds.argument[1],
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

const findUpperAndLowerValues = (data, key) => {
  const {
    timeSeries,
    aggregate,
  } = data

  const above = timeSeries.filter( d => d[key] > d.mvgAvg )

  const aboveMean = getMean(above.map( d => d[key] ))

  const aboveMinMax = getMinAndMax(above, key)

  const below = timeSeries.filter( d => d[key] < d.mvgAvg )

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

const objective1 = x => -(x**2) + (3*x)

const forOptimization = x => -objective1(x)

const testOptimization = () => {

  return optimize.minimize_Powell(forOptimization, [-10])
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

const scoreValues = composeData(
  calculateMovingAverage,
  calculateScore,
)

const calculateScoreData = composeData(
  calculateScore,
)

const calculateDerivedData = composeData(
  calculateMean,
  calculateMovingAverage,
  calculateScore,
  findInflections,
  findStdDev,
  findUpperAndLowerValues,
)

const calculateInsightData = composeData(
  findInflections,
  findUpperAndLowerValues,
)

module.exports = {
  composeData,
  testOptimization,
  calculateMovingAverage,
  calculateScore,
  calculateArbitrage,
  scoreValues,
  findMinMax,
  findInflections,
  findRevenueAndCharge,
  findAggregateRevenue,
  findThresholds,
  findStdDev,
  calculateScoreData,
  calculateDerivedData,
  findUpperAndLowerValues,
  calculateInsightData,
  getCenteredValuesArr,
  getTwoDimensionalArray,
  calculateMean,
}
