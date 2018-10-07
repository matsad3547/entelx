const pipeData = (...fns) => (data, key, period) => fns.reduce( (v, f) => f(v, key, period), data)

const calculateMovingAverage = (data, key, period) => data.reduce( (arr, d, i) => data[i - 1] ?
  [
    ...arr,
    {
      timestamp: d.timestamp,
      [key]: d[key],
      mvgAvg: data
              .slice(Math.max(0, i - (period - 1)), i + 1)
              .reduce( ([sum, n], obj, i, arr) => i !== (arr.length - 1) ?
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
    score: d[key] / d.mvgAvg,
  })
)

const scoreValues = pipeData(
  calculateMovingAverage,
  calculateScore,
)

module.exports = {
  calculateMovingAverage,
  scoreValues,
}
