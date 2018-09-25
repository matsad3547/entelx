const parseHourlyWeatherData = (hourlyWeatherObj, ...keys) => {

  const otherVals = keys.reduce( (obj, key) => ({
    ...obj,
    [key]: hourlyWeatherObj[key],
  }), {})

  return {
    timestamp: hourlyWeatherObj.time * 1000,
    ...otherVals,
  }
}

module.exports = {
  parseHourlyWeatherData,
}
