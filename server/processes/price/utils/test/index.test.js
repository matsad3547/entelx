const { getFirstUpdateMillis } = require('../index')

describe('getFirstUpdateMillis', () => {
  test('should return 1 minute if `lastDataAgoMillis` = 6 minutes', () => {
    const lastDataAgoMillis = 6 * 60 * 1000
    const expected = 1 * 60 * 1000
    const actual = getFirstUpdateMillis(lastDataAgoMillis)
    expect(actual).toEqual(expected)
  })

  test('should return 1 minute if `lastDataAgoMillis` = 16 minutes', () => {
    const lastDataAgoMillis = 16 * 60 * 1000
    const expected = 1 * 60 * 1000
    const actual = getFirstUpdateMillis(lastDataAgoMillis)
    expect(actual).toEqual(expected)
  })

  test('should return 1 minute if `lastDataAgoMillis` = 1 minute', () => {
    const lastDataAgoMillis = 1 * 60 * 1000
    const expected = 1 * 60 * 1000
    const actual = getFirstUpdateMillis(lastDataAgoMillis)
    expect(actual).toEqual(expected)
  })
})
