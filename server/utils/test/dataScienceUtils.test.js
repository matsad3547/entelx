const { timeSeriesData } = require('./mocks/timeSeries')

const {
  calculateMovingAverage,
  scoreValues,
} = require('../dataScienceUtils')

describe('calculateMovingAverage', () => {

  test('should return an array', () => {
    const data = timeSeriesData
    const period = 10
    const key = 'lmp'
    const expected = true
    const actual = Array.isArray(calculateMovingAverage(data, key, period))
    expect(actual).toEqual(expected)
  })

  test('should return an array 287 items long', () => {
    const data = timeSeriesData
    const period = 10
    const key = 'lmp'
    const expected = 287
    const actual = calculateMovingAverage(data, key, period).length
    expect(actual).toEqual(expected)
  })

  test('should return an object with a `timestamp` property and a `mvAvg` property and a property for whichever key was passed in', () => {
    const data = timeSeriesData
    const period = 10
    const key = 'lmp'
    const expected = new Array(287).fill(true)
    const arr = calculateMovingAverage(data, key, period)
    const keyArr = arr.map( obj => Object.keys(obj) )
    const actual = keyArr.map( k =>
      k.includes('timestamp') &&
      k.includes('mvgAvg') &&
      k.includes(key)
    )
    expect(actual).toEqual(expected)
  })

  test('should have a value for its first entry equal to the average of the first two entries of the input', () => {
    const data = timeSeriesData
    const period = 5
    const key = 'lmp'
    const expected = 27.02553
    const actual = calculateMovingAverage(data, key, period)[0].mvgAvg
    expect(actual).toEqual(expected)
  })

  test('should have a value of `26.694084` for its last entry for the last 5 entries', () => {
    const data = timeSeriesData.slice(282)
    const period = 5
    const key = 'lmp'
    const expected = 26.694084000000004
    const actual = calculateMovingAverage(data, key, period)[4].mvgAvg
    expect(actual).toEqual(expected)
  })
})

describe('scoreValues', () => {

  const testData = [
    //centered on 3
    {
      timestamp: 1,
      val: 3,
    },
    {
      timestamp: 2,
      val: 7,
    },
    {
      timestamp: 3,
      val: -1,
    },
    {
      timestamp: 4,
      val: 6,
    },
    {
      timestamp: 5,
      val: 0,
    },
    {
      timestamp: 6,
      val: 8,
    },
  ]

  test('should return an array', () => {
    const data = testData
    const period = 5
    const key = 'val'
    const expected = true
    const actual = Array.isArray(scoreValues(data, key, period))
    expect(actual).toEqual(expected)
  })

  test('should return an array 5 items long', () => {
    const data = testData
    const period = 5
    const key = 'val'
    const expected = 5
    const actual = scoreValues(data, key, period).length
    expect(actual).toEqual(expected)
  })

  test('should return an object with `timestamp`, `mvAvg`, and `score` properties and a property for whichever key was passed in', () => {
    const data = testData
    const period = 5
    const key = 'val'
    const expected = new Array(5).fill(true)
    const arr = scoreValues(data, key, period)
    const keyArr = arr.map( obj => Object.keys(obj) )
    const actual = keyArr.map( k =>
      k.includes('timestamp') &&
      k.includes('mvgAvg') &&
      k.includes('score') &&
      k.includes(key)
    )
    expect(actual).toEqual(expected)
  })

  test('should have a `mvgAvg` value of `4` for its last entry for the last 5 entries', () => {
    const data = testData
    const period = 5
    const key = 'val'
    const expected = 4
    const actual = scoreValues(data, key, period)[4].mvgAvg
    expect(actual).toEqual(expected)
  })

  test('should have a `score` value of `2` for its last entry', () => {
    const data = testData
    const period = 5
    const key = 'val'
    const expected = 1
    const actual = scoreValues(data, key, period)[4].score
    expect(actual).toEqual(expected)
  })

  test('should have a `score` value of `0.4` for its first entry', () => {
    const data = testData
    const period = 5
    const key = 'val'
    const expected = .4
    const actual = scoreValues(data, key, period)[0].score
    expect(actual).toEqual(expected)
  })

  test('should have a `score` value of `-1` for its second to last entry', () => {
    const data = testData
    const period = 5
    const key = 'val'
    const expected = -1
    const actual = scoreValues(data, key, period)[3].score
    expect(actual).toEqual(expected)
  })
  
  //visualization purposes only
  // test('should look like an array of objects', () => {
  //   const data = testData
  //   const period = 5
  //   const key = 'val'
  //   const expected = []
  //   const actual = scoreValues(data, key, period)
  //   expect(actual).toEqual(expected)
  // })

  // //visualization purposes only
  // test('should look like an array of objects', () => {
  //   const data = timeSeriesData
  //   const period = 10
  //   const key = 'lmp'
  //   const expected = []
  //   const actual = scoreValues(data, key, period)
  //   expect(actual).toEqual(expected)
  // })
})
