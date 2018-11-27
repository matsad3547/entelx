const { timeSeriesData } = require('./mocks/timeSeries')

const {
  calculateMovingAverage,
  calculateScore,
  calculateArbitrage,
  findMinMax,
  pipeData,
} = require('../dataScienceUtils')

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

test('pipeData should return an object with `timeSeries` and `aggregate` properties', () => {
  const st = data => data
  const composed = pipeData(st)
  const actual = composed(testData)
  const expected = {
    timeSeries: testData,
    aggregate: {},
  }
  expect(actual).toEqual(expected)
})

describe('calculateMovingAverage', () => {

  const getAvgData = pipeData(calculateMovingAverage)

  test('should return an array', () => {
    const data = timeSeriesData
    const period = 10
    const key = 'lmp'
    const expected = true
    const actual = Array.isArray(getAvgData(data, key, period).timeSeries)
    expect(actual).toEqual(expected)
  })

  test('should return an array 287 items long', () => {
    const data = timeSeriesData
    const period = 10
    const key = 'lmp'
    const expected = 287
    const actual = getAvgData(data, key, period).timeSeries.length
    expect(actual).toEqual(expected)
  })

  test('should return an object with a `timestamp` property and a `mvAvg` property and a property for whichever key was passed in', () => {
    const data = timeSeriesData
    const period = 10
    const key = 'lmp'
    const expected = new Array(287).fill(true)
    const arr = getAvgData(data, key, period)
    const keyArr = arr.timeSeries.map( obj => Object.keys(obj) )
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
    const actual = getAvgData(data, key, period).timeSeries[0].mvgAvg
    expect(actual).toEqual(expected)
  })

  test('should have a value of `26.694084` for its last entry for the last 5 entries', () => {
    const data = timeSeriesData.slice(282)
    const period = 5
    const key = 'lmp'
    const expected = 26.694084000000004
    const actual = getAvgData(data, key, period).timeSeries[4].mvgAvg
    expect(actual).toEqual(expected)
  })
})

describe('calculateScore', () => {

  const period = 5
  const key = 'val'

  const getScoreData = pipeData(
    calculateMovingAverage,
    calculateScore,
  )

  test('should return an array', () => {
    const expected = true
    const actual = Array.isArray(getScoreData(testData, key, period).timeSeries)
    expect(actual).toEqual(expected)
  })

  test('should return an array 5 items long', () => {
    const expected = 5
    const actual = getScoreData(testData, key, period).timeSeries.length
    expect(actual).toEqual(expected)
  })

  test('should return an object with `timestamp`, `mvAvg`, and `score` properties and a property for whichever key was passed in', () => {
    const expected = new Array(5).fill(true)
    const arr = getScoreData(testData, key, period).timeSeries
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
    const expected = 4
    const actual = getScoreData(testData, key, period).timeSeries[4].mvgAvg
    expect(actual).toEqual(expected)
  })

  test('should have a `score` value of `2` for its last entry', () => {
    const expected = 1
    const actual = getScoreData(testData, key, period).timeSeries[4].score
    expect(actual).toEqual(expected)
  })

  test('should have a `score` value of `0.4` for its first entry', () => {
    const expected = .4
    const actual = getScoreData(testData, key, period).timeSeries[0].score
    expect(actual).toEqual(expected)
  })

  test('should have a `score` value of `-1` for its second to last entry', () => {
    const expected = -1
    const actual = getScoreData(testData, key, period).timeSeries[3].score
    expect(actual).toEqual(expected)
  })

  // visualization purposes only
  test('should look like an array of objects', () => {
    const expected = [
      {
        mvgAvg: 5,
        score: 0.4,
        timestamp: 2,
        val: 7,
      },
      {
        mvgAvg: 3,
        score: -1.3333333333333333,
        timestamp: 3,
        val: -1,
      },
      {
        mvgAvg: 3.75,
        score: 0.6,
        timestamp: 4,
        val: 6,
      },
      {
        mvgAvg: 3,
        score: -1,
        timestamp: 5,
        val: 0,
      },
      {
        mvgAvg: 4,
        score: 1,
        timestamp: 6,
        val: 8,
      },
    ]
    const actual = getScoreData(testData, key, period).timeSeries
    expect(actual).toEqual(expected)
  })

  // //visualization purposes only
  // test('should look like an array of objects', () => {
  //   const period = 10
  //   const key = 'lmp'
  //   const data = getAvgData(timeSeriesData, key, period)
  //   const expected = []
  //   const actual = calculateScore(data, key)
  //   expect(actual).toEqual(expected)
  // })
})

describe('calculateArbitrage', () => {

  const period = 5
  const key = 'val'
  const getArbitrageData = pipeData(
    calculateMovingAverage,
    calculateScore,
    calculateArbitrage,
  )

  test('should return the passed in data', () => {
    const actual = getArbitrageData(testData, key, period, .5).timeSeries

    const expected = [
      {
        mvgAvg: 5,
        score: 0.4,
        timestamp: 2,
        val: 7,
      },
      {
        mvgAvg: 3,
        score: -1.3333333333333333,
        timestamp: 3,
        val: -1,
      },
      {
        mvgAvg: 3.75,
        score: 0.6,
        timestamp: 4,
        val: 6,
      },
      {
        mvgAvg: 3,
        score: -1,
        timestamp: 5,
        val: 0,
      },
      {
        mvgAvg: 4,
        score: 1,
        timestamp: 6,
        val: 8,
      },
    ]
    expect(actual).toEqual(expected)
  })

  test('should return an `aggregate` object with a correct `chargeVol` object', () => {
    const actual = getArbitrageData(testData, key, period, .5).aggregate.chargeVol
    const expected = {
      avgPrc: -.5,
      n: 2,
    }
    expect(actual).toEqual(expected)
  })

  test('should return an `aggregate` object with a correct `dischargeVol` object', () => {
    const actual = getArbitrageData(testData, key, period, .5).aggregate.dischargeVol
    const expected = {
      avgPrc: 7,
      n: 2,
    }
    expect(actual).toEqual(expected)
  })
})

describe('findMinMax', () => {

  const period = 5
  const key = 'val'
  const getMinMaxData = pipeData(
    calculateMovingAverage,
    calculateScore,
    findMinMax,
  )

  test('should return the passed in data', () => {
    const actual = getMinMaxData(testData, key, period).timeSeries
    const expected = [
      {
        mvgAvg: 5,
        score: 0.4,
        timestamp: 2,
        val: 7,
      },
      {
        mvgAvg: 3,
        score: -1.3333333333333333,
        timestamp: 3,
        val: -1,
      },
      {
        mvgAvg: 3.75,
        score: 0.6,
        timestamp: 4,
        val: 6,
      },
      {
        mvgAvg: 3,
        score: -1,
        timestamp: 5,
        val: 0,
      },
      {
        mvgAvg: 4,
        score: 1,
        timestamp: 6,
        val: 8,
      },
    ]
    expect(actual).toEqual(expected)
  })

  test('should return an `aggregate` object with a correct `max` value', () => {
    const actual = getMinMaxData(testData, key, period).aggregate.max
    const expected = 8
    expect(actual).toEqual(expected)
  })

  test('should return an `aggregate` object with a correct `min` value', () => {
    const actual = getMinMaxData(testData, key, period).aggregate.min
    const expected = -1
    expect(actual).toEqual(expected)
  })
})
