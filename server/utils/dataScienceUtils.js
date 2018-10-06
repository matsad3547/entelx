const calculateMovingAverage = (data, period, key) => {
  console.log('data:', data, '\nlength:', data.length)
  const calc = data.reduce( (arr, d, i) => data[i - 1] ?
    [
      ...arr,
      {
        timestamp: d.timestamp,
        mvAvg: data.slice(Math.max(0, i - period), i + 1)
                .reduce( ([sum, n], obj, i, arr) =>
                {
                  console.log(
                    'i:', i,
                    '\nsum:', sum,
                    '\nn:', n,
                    '\nlength:', arr.length
                  );
                  return i !== (arr.length - 1) ?
                  [sum + obj[key], n + 1] :
                  (sum + obj[key])/(n + 1)
                }
                , [0, 0]),
      }
    ] :
    arr, [])
    console.log('calc:', calc);
  return calc
}

module.exports = {
  calculateMovingAverage,
}
