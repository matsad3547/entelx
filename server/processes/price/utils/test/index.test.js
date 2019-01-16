const { getFirstUpdate } = require('../index')

describe('getFirstUpdate', () => {
  test('should return 1 minute if `lastDataAgo` = 6 minutes', () => {
    const lastDataAgo = 6 * 60 * 1000
    const expected = 1 * 60 * 1000
    const actual = getFirstUpdate(lastDataAgo)
    expect(actual).toEqual(expected)
  })

  test('should return 1 minute if `lastDataAgo` = 16 minutes', () => {
    const lastDataAgo = 16 * 60 * 1000
    const expected = 1 * 60 * 1000
    const actual = getFirstUpdate(lastDataAgo)
    expect(actual).toEqual(expected)
  })

  test('should return 1 minute if `lastDataAgo` = 1 minute', () => {
    const lastDataAgo = 1 * 60 * 1000
    const expected = 1 * 60 * 1000
    const actual = getFirstUpdate(lastDataAgo)
    expect(actual).toEqual(expected)
  })
})
