const { parseHourlyWeatherData } = require('../parsers')

describe('parseHourlyWeatherData', () => {

  let hourlyWeatherObj

  beforeEach( () => {
    hourlyWeatherObj = {
      apparentTemperature: 58.62,
      cloudCover: 1,
      dewPoint: 51.67,
      humidity: 0.78,
      icon: "cloudy",
      precipIntensity: 0.0063,
      precipIntensityError: 0.0663,
      precipProbability: 0.05,
      precipProbabilityError: 0.05,
      precipType: "rain",
      pressure: 1015.7,
      pressureError: 14.37,
      summary: "Overcast",
      temperature: 58.62,
      time: 25513200,
      uvIndex: 0,
      visibility: 10,
      windBearing: 189,
      windSpeed: 3.31,
    }
  })

  test('should return an object with a timestamp in millis by default', () => {
    const actual = parseHourlyWeatherData(hourlyWeatherObj)
    const expected = {
      timestamp: 25513200000,
    }
    expect(actual).toEqual(expected)
  })

  test('should return an object with data for each of the keys passed in', () => {
    const actual = parseHourlyWeatherData(
      hourlyWeatherObj,
      'cloudCover',
      'precipIntensity',
      'temperature',
    )
    const expected = {
      timestamp: 25513200000,
      cloudCover: 1,
      precipIntensity: 0.0063,
      temperature: 58.62,
    }
    expect(actual).toEqual(expected)
  })
})
