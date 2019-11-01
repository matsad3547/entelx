const {
  getDBDatetime,
  getISOFromDB,
} = require('../dateTimeUtils')

describe('getDBDatetime', () => {
  test('should return a useful datetime string', () => {
    const isoString = '2019-10-07T14:40:00.000Z'
    const actual = getDBDatetime(isoString)
    // "YYYY-MM-DD HH:mm:ss"
    const expected = '2019-10-07 14:40:00.000'
    expect(actual).toEqual(expected)
  })
})
