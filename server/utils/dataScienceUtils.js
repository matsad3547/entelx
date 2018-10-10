const pipeData = (...fns) => (data, key, period) => fns.reduce( (v, f) => f(v, key, period), data)

const calculateMovingAverage = (data, key, period) => data.reduce( (arr, d, i) => data[i - 1] ?
  [
    ...arr,
    {
      timestamp: d.timestamp,
      [key]: d[key],
      mvgAvg: data
              .slice(Math.max(0, i - (period - 1)), i + 1)
              .reduce( ([sum, n], obj, i, arr) =>
              i !== (arr.length - 1) ?
                [sum + obj[key], n + 1] :
                (sum + obj[key])/(n + 1)
              , [0, 0]),
    }
  ] :
  arr, [])

const calculateScore = (data, key) => data.map( d => ({
    timestamp: d.timestamp,
    mvgAvg: d.mvgAvg,
    [key]: d[key],
    score: (d[key] - d.mvgAvg) / d.mvgAvg,
  })
)

const calculateArbitrage = (data, key, period, threshold) => data.reduce( (obj, d, i) =>
  i < data.length - 1 ?
  {
    data: obj.data,
    chargeVol: {
      prcSum: data[i].score < -threshold ?
        obj.chargeVol.prcSum + data[i][key] :
        obj.chargeVol.prcSum,
      n: data[i].score < -threshold ?
        obj.chargeVol.n + 1 :
        obj.chargeVol.n,
    },
    dischargeVol: {
      prcSum: data[i].score > threshold ?
        obj.dischargeVol.prcSum + data[i][key] :
        obj.dischargeVol.prcSum,
      n: data[i].score > threshold ?
        obj.dischargeVol.n + 1 :
        obj.dischargeVol.n,
    },
  } :
  {
    data: obj.data,
    chargeVol: {
      avgPrc: data[i].score < -threshold ?
      (obj.chargeVol.prcSum + data[i][key]) / (obj.chargeVol.n + 1) :
      obj.chargeVol.prcSum / obj.chargeVol.n,
      n: data[i].score < -threshold ?
      obj.chargeVol.n + 1 :
      obj.chargeVol.n,
    },
    dischargeVol: {
      avgPrc: data[i].score > threshold ?
      (obj.dischargeVol.prcSum + data[i][key]) / (obj.dischargeVol.n + 1) :
      obj.dischargeVol.prcSum / obj.dischargeVol.n,
      n: data[i].score > threshold ?
      obj.dischargeVol.n + 1 :
      obj.dischargeVol.n,
    },
  },
  {
    data,
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

const scoreValues = pipeData(
  calculateMovingAverage,
  calculateScore,
)

module.exports = {
  calculateMovingAverage,
  calculateScore,
  calculateArbitrage,
  pipeData,
  scoreValues,
}
