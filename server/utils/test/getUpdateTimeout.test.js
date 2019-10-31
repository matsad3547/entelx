const {
  getUpdateTimeout,
} = require('../dateTimeUtils')

const nowMillis = 1564632060000

jest.mock('moment-timezone', () => () => ({
    valueOf: () => 1564632060000
  })
)

describe('getUpdateTimeout', () => {

  test('should return 1 minute and one second when given a time 4 minutes ago', () => {
    const mostRecentTimestamp = nowMillis - (4 * 60 * 1000)
    const expected = 61000
    const actual = getUpdateTimeout(mostRecentTimestamp)
    expect(actual).toEqual(expected)
  })

  test('should return 1 minute and one second when given a time 24 minutes ago', () => {
    const mostRecentTimestamp = nowMillis - (24 * 60 * 1000)
    const expected = 61000
    const actual = getUpdateTimeout(mostRecentTimestamp)
    expect(actual).toEqual(expected)
  })
})
