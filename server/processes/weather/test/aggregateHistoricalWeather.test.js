const aggregateHistoricalWeather = require('../aggregateHistoricalWeather')
require('isomorphic-fetch')

describe('aggregateHistoricalWeather()', () => {
  test('should be defined', () => {
    const actual = aggregateHistoricalWeather
    expect(actual).toBeDefined()
  })
})
