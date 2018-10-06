const calculateMovingAverage = (data, period, key) => data.reduce( (arr, d, i) => data[i - 1] ?
  [
    ...arr,
    {
      timestamp: d.timestamp,
      mvAvg: data
              .slice(Math.max(0, i - (period - 1)), i + 1)
              .reduce( ([sum, n], obj, i, arr) => i !== (arr.length - 1) ?
                [sum + obj[key], n + 1] :
                (sum + obj[key])/(n + 1)
              , [0, 0]),
    }
  ] :
  arr, [])

module.exports = {
  calculateMovingAverage,
}
