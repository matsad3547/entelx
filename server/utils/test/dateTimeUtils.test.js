const {
  getDBDatetime,
  getRemainderMillis,
} = require('../dateTimeUtils')

const { fiveMinutesMillis } = require('../../config/')

describe('getDBDatetime', () => {
  test('should return a useful datetime string', () => {
    const isoString = '2019-10-07T14:40:00.000Z'
    const actual = getDBDatetime(isoString)
    // "YYYY-MM-DD HH:mm:ss"
    const expected = '2019-10-07 14:40:00.000'
    expect(actual).toEqual(expected)
  })
})

// Presume the first stamp is on the interval
describe('getRemainderMillis', () => {

  test('should return the number of millis from the current time to the next instance of an interval', () => {
    const tsUnix = 1572920100000
    const nowUnix = 1572920203931
    const intervalMillis = fiveMinutesMillis

    const actual = getRemainderMillis(tsUnix, nowUnix, intervalMillis)
    const expected = 196069
    expect(actual).toEqual(expected)
  })

  test('should return the number of millis from the current time to the next instance of an interval even if that difference is larger than the interval ', () => {
    const tsUnix = 1572910100000
    const nowUnix = 1572920203000
    const intervalMillis = fiveMinutesMillis

    const actual = getRemainderMillis(tsUnix, nowUnix, intervalMillis)
    const expected = 97000
    expect(actual).toEqual(expected)
  })

  // test('should return the interval if the timestamp is after the current value', () => {
  //
  //   const tsUnix = 1572971100000
  //   const nowUnix = 1572970954599
  //   const intervalMillis = fiveMinutesMillis
  //
  //   const actual = getRemainderMillis(tsUnix, nowUnix, intervalMillis)
  //   const expected = fiveMinutesMillis
  //   expect(actual).toEqual(expected)
  // })
})
