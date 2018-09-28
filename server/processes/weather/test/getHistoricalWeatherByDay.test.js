const getHistoricalWeatherByDay = require('../getHistoricalWeatherByDay')
require('isomorphic-fetch')

describe('getHistoricalWeatherByDay()', () => {
  test('should be defined', () => {
    const actual = getHistoricalWeatherByDay
    expect(actual).toBeDefined()
  })
})
