const optimize = require('optimization-js')
const fmin = require('fmin')

console.log('optimize?', optimize);

const pipeData = (...fns) => (data, key, period, options) => {
  const res = {
    timeSeries: data,
    aggregate: {},
  }
  return fns.reduce( (v, f) => f(v, key, period, options), res)
}

const getSum = (a, b) => a + b

const getMean = arr => arr.reduce(getSum)/arr.length

const calculateMovingAverage = (data, key, period) => {

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
      timestamp: d.timestamp,
      mvgAvg: d.mvgAvg,
      [key]: d[key],
      score: (d[key] - d.mvgAvg) / d.mvgAvg,
    })
  )

  return {
    ...data,
    timeSeries: calculation,
  }
}

const calculateArbitrage = (data, key, period, options) => {

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

const findMinMax = (data, key, period) => {

  const {
    timeSeries,
    aggregate,
  } = data

  const calculation = timeSeries.reduce( (obj, d, i) =>  ({
    max: d[key] > obj.max ? d[key] : obj.max,
    min: d[key] < obj.min ? d[key] : obj.min,
  }), {max: 0, min: 0})

  return {
    ...data,
    aggregate: {
      ...aggregate,
      ...calculation,
    }
  }
}

const findInflections = (data, key, period) => {

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

const getRevenue = (data, key, period, options) => {

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

  return (chargeThreshold, dischargeThreshold) => timeSeries.reduce( (obj, d, i) => {

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
}

// const findRevenue = getRevenue(data, key, period, options)(data.aggregate.chargeThreshold, data.aggregate.dischargeThreshold)

const findRevenue = (data, key, period, options) => {

  const {
    timeSeries,
    aggregate,
  } = data

  const {
    dischargeThreshold,
    chargeThreshold,
  } = aggregate

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

    // console.log('at findRevenue:', obj.charge, i);

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

  return {
    ...data,
    aggregate: {
      ...aggregate,
      ...calculation(dischargeThreshold, chargeThreshold),
    }
  }
}

const findThresholds = (data, key, period, options) => {

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

    console.log('at findThresholds?', obj.charge, i, dischargeThreshold, chargeThreshold);

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

  const initThresholdVal = maxThreshold / 2

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

const findStdDev = (data, key, period, options) => {

  const {
    timeSeries,
    aggregate,
  } = data

  const mean = timeSeries.reduce( (sum, d, i) => sum + d[key], 0)/timeSeries.length

  const stdDev = Math.sqrt(getMean(timeSeries.map( d => (d[key] - mean)**2 )))

  return {
    ...data,
    aggregate: {
      ...aggregate,
      stdDev,
    }
  }
}

const objective1 = x => -(x**2) + (3*x)

const forOptimization = x => -objective1(x)

const testOptimization = () => {

  return optimize.minimize_Powell(forOptimization, [-10])
}

const scoreValues = pipeData(
  calculateMovingAverage,
  calculateScore,
)

const calculateScoreData = pipeData(
  calculateScore,
)

const calculateDerivedData = pipeData(
  calculateMovingAverage,
  calculateScore,
  findMinMax,
  findInflections,
)

module.exports = {
  pipeData,
  testOptimization,
  calculateMovingAverage,
  calculateScore,
  calculateArbitrage,
  scoreValues,
  findMinMax,
  findInflections,
  findRevenue,
  findThresholds,
  findStdDev,
  calculateScoreData,
  calculateDerivedData,
}
