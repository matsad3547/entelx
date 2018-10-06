const { timeSeriesData } = require('./mocks/timeSeries')

const { calculateMovingAverage } = require('../dataScienceUtils')

describe('calculateMovingAverage', () => {

  // test('should return an array', () => {
  //   const data = timeSeriesData
  //   const period = 10
  //   const key = 'lmp'
  //   const expected = true
  //   const actual = Array.isArray(calculateMovingAverage(data, period, key))
  //   expect(actual).toEqual(expected)
  // })
  //
  // test('should return an array 287 items long', () => {
  //   const data = timeSeriesData
  //   const period = 10
  //   const key = 'lmp'
  //   const expected = 287
  //   const actual = calculateMovingAverage(data, period, key).length
  //   expect(actual).toEqual(expected)
  // })
  //
  // test('should return an object with a `timestamp` property and a `mvAvg` property', () => {
  //   const data = timeSeriesData
  //   const period = 10
  //   const key = 'lmp'
  //   const expected = new Array(287).fill(true)
  //   const arr = calculateMovingAverage(data, period, key)
  //   const keyArr = arr.map( obj => Object.keys(obj) )
  //   const actual = keyArr.map( k => k.includes('timestamp') && k.includes('mvAvg'))
  //   expect(actual).toEqual(expected)
  // })
  //
  // test('should have a value for its first entry equal to the average of the first two entries of the input', () => {
  //   const data = timeSeriesData
  //   const period = 5
  //   const key = 'lmp'
  //   const expected = 27.02553
  //   const actual = calculateMovingAverage(data, period, key)[0].mvAvg
  //   expect(actual).toEqual(expected)
  // })

  test('should have a value of `27.170032` for its last entry for the last 5 entries', () => {
    const data = timeSeriesData.slice(282)
    const period = 5
    const key = 'lmp'
    const expected = 26.694084
    const actual = calculateMovingAverage(data, period, key)[4].mvAvg
    expect(actual).toEqual(expected)
  })
})
