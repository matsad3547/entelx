const { timeSeriesData } = require('./mocks/timeSeries')

const {
  composeData,
  testOptimization,
  calculateMovingAverage,
  calculateScore,
  calculateArbitrage,
  findMinMax,
  calculateDerivedData,
  findInflections,
  findAggregateRevenue,
  findStdDev,
  findThresholds,
  findRevenueAndCharge,
  findUpperAndLowerValues,
  getCenteredValuesArr,
  getTwoDimensionalArray,
} = require('../calculationUtils')

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

test('composeData should return an object with `timeSeries` and `aggregate` properties', () => {
  const st = data => data
  const composed = composeData(st)
  const actual = composed(testData)
  const expected = {
    timeSeries: testData,
    aggregate: {},
  }
  expect(actual).toEqual(expected)
})

describe('calculateMovingAverage', () => {

  const getAvgData = composeData(calculateMovingAverage)

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

  const getScoreData = composeData(
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
  const getArbitrageData = composeData(
    calculateMovingAverage,
    calculateScore,
    calculateArbitrage,
  )

  const options = {
    chargeThreshold: .5,
    dischargeThreshold: .5,
  }

  test('should return the passed in data', () => {
    const actual = getArbitrageData(testData, key, period, options).timeSeries

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
    const actual = getArbitrageData(testData, key, period, options).aggregate.chargeVol
    const expected = {
      avgPrc: -.5,
      n: 2,
    }
    expect(actual).toEqual(expected)
  })

  test('should return an `aggregate` object with a correct `dischargeVol` object', () => {
    const actual = getArbitrageData(testData, key, period, options).aggregate.dischargeVol
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
  const getMinMaxData = composeData(
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

test('calculateDerivedData should work', () => {
  const actual = calculateDerivedData(testData, 'val', 5)
  expect(actual).toBeDefined()
})


describe('findInflections', () => {

  const period = 5
  const key = 'val'
  const getInflectionData = composeData(
    calculateMovingAverage,
    calculateScore,
    findInflections,
  )

  const dataSnippet = [
    {
      timestamp: 1538710500000,
      congestionPrc: 0,
      energyPrc: 28.02027,
      ghgPrc: 0,
      lossPrc: -0.38948,
      lmp: 27.63079,
    },
    {
      timestamp: 1538710800000,
      congestionPrc: 0,
      energyPrc: 26.79269,
      ghgPrc: 0,
      lossPrc: -0.37242,
      lmp: 26.42027,
    },
    {
      timestamp: 1538711100000,
      congestionPrc: 0,
      energyPrc: 26.83094,
      ghgPrc: 0,
      lossPrc: -0.36758,
      lmp: 26.46335,
    },
    {
      timestamp: 1538711400000,
      congestionPrc: 0,
      energyPrc: 26.76948,
      ghgPrc: 0,
      lossPrc: -0.36674,
      lmp: 26.40274,
    },
    {
      timestamp: 1538711700000,
      congestionPrc: 0,
      energyPrc: 27.86177,
      ghgPrc: 0,
      lossPrc: -0.38171,
      lmp: 27.48006,
    },
    {
      timestamp: 1538712000000,
      congestionPrc: 0,
      energyPrc: 32.1997,
      ghgPrc: 0,
      lossPrc: -0.4025,
      lmp: 31.79721,
    },
    {
      timestamp: 1538712300000,
      congestionPrc: -25.06595,
      energyPrc: 47.8386,
      ghgPrc: 0,
      lossPrc: -0.59798,
      lmp: 22.17467,
    }
  ]

  test('should return the passed in data', () => {
    const actual = getInflectionData(testData, key, period).timeSeries
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

  test('should return an array for `inflections`', () => {
    const actual = Array.isArray(getInflectionData(dataSnippet, 'lmp', period).aggregate.inflections)
    const intermediate = [
      {
        timestamp:1538710800000,
        lmp:26.42027,
        mvgAvg: 27.02553,
        score: -0.02239586050671351,
      },
      {
        timestamp:1538711100000,
        lmp:26.46335,
        mvgAvg: 26.838136666666667,
        score: -0.013964705199976085,
      },
      {
        timestamp:1538711400000,
        lmp:26.40274,
        mvgAvg: 26.729287499999998,
        score: -0.01221684266742975,
      },
      {
        timestamp:1538711700000,
        lmp:27.48006,
        mvgAvg: 26.879442,
        score: 0.022344883498697655,
      },
      {
        timestamp:1538712000000,
        lmp:31.79721,
        mvgAvg: 27.712726000000004,
        score: 0.14738658333359178
      },
      {
        timestamp:1538712300000,
        lmp:22.17467,
        mvgAvg: 26.863605999999997,
        score: -0.17454603823477752,
      }
    ]
    expect(actual).toEqual(true)
  })

  test('should return an array of inflection timestamps', () => {
    const actual = getInflectionData(dataSnippet, 'lmp', period).aggregate.inflections
    const intermediate = [
      {
        timestamp:1538710800000,
        lmp:26.42027,
        mvgAvg: 27.02553,
        score: -0.02239586050671351,
      },
      {
        timestamp:1538711100000,
        lmp:26.46335,
        mvgAvg: 26.838136666666667,
        score: -0.013964705199976085,
      },
      {
        timestamp:1538711400000,
        lmp:26.40274,
        mvgAvg: 26.729287499999998,
        score: -0.01221684266742975,
      },
      {
        timestamp:1538711700000,
        lmp:27.48006,
        mvgAvg: 26.879442,
        score: 0.022344883498697655,
      },
      {
        timestamp:1538712000000,
        lmp:31.79721,
        mvgAvg: 27.712726000000004,
        score: 0.14738658333359178
      },
      {
        timestamp:1538712300000,
        lmp:22.17467,
        mvgAvg: 26.863605999999997,
        score: -0.17454603823477752,
      }
    ]
    const expected = [
      1538710800000,
      1538711700000,
      1538712300000,
    ]
    expect(actual).toEqual(expected)
  })
})

describe('findAggregateRevenue', () => {

  const period = 6
  const key = 'lmp'
  const getRevenueData = composeData(
    calculateMovingAverage,
    calculateScore,
    findAggregateRevenue,
  )

  const mockData = [
    {
      timestamp: 1538710500000,
      lmp: 4,
    },
    {
      timestamp: 1538710500000,
      lmp: 3,
    },
    {
      timestamp: 1538710800000,
      lmp: 2,
    },
    {
      timestamp: 1538711100000,
      lmp: 1,
    },
    {
      timestamp: 1538711400000,
      lmp: 5,
    },
    {
      timestamp: 1538711700000,
      lmp: 6,
    },
    {
      timestamp: 1538712000000,
      lmp: 7,
    },
  ]

  const staticAvg = [
    {
     lmp: 3,
     mvgAvg: 4,
     score: -0.14285714285714285,
     timestamp: 1538710500000,
    },
    {
     lmp: 2,
     mvgAvg: 4,
     score: -0.3333333333333333,
     timestamp: 1538710800000,
    },
    {
     lmp: 1,
     mvgAvg: 4,
     score: -0.6,
     timestamp: 1538711100000,
    },
    {
     lmp: 5,
     mvgAvg: 4,
     score: 0.6666666666666666,
     timestamp: 1538711400000,
    },
    {
     lmp: 6,
     mvgAvg: 4,
     score: 0.7142857142857143,
     timestamp: 1538711700000,
    },
    {
     lmp: 7,
     mvgAvg: 4,
     score: 0.75,
     timestamp: 1538712000000,
    },
  ]

  test('should return a `timeSeries` array', () => {
    const actual = getRevenueData(mockData, key, period, {}).timeSeries
    const expected = [
      {
       lmp: 3,
       mvgAvg: 3.5,
       score: -0.14285714285714285,
       timestamp: 1538710500000,
      },
      {
       lmp: 2,
       mvgAvg: 3,
       score: -0.3333333333333333,
       timestamp: 1538710800000,
      },
      {
       lmp: 1,
       mvgAvg: 2.5,
       score: -0.6,
       timestamp: 1538711100000,
      },
      {
       lmp: 5,
       mvgAvg: 3,
       score: 0.6666666666666666,
       timestamp: 1538711400000,
      },
      {
       lmp: 6,
       mvgAvg: 3.5,
       score: 0.7142857142857143,
       timestamp: 1538711700000,
      },
      {
       lmp: 7,
       mvgAvg: 4,
       score: 0.75,
       timestamp: 1538712000000,
      },
    ]
    expect(actual).toEqual(expected)
  })

  test('should return a `revenue` value on the `aggregate` object', () => {

    const data = {
      timeSeries: staticAvg,
      aggregate: {
        dischargeThreshold: 0,
        chargeThreshold: 0,
      },
    }
    const options = {
      power: .001,
      energy: (1/6) * .001,
      rte: 1,
      dischargeBuffer: 0,
      chargeBuffer: 0,
    }
    const actual = findAggregateRevenue(data, 'lmp', 6, options).aggregate.revenue
    const expected = .0005
    expect(actual).toEqual(expected)
  })

  test('should return a `charge` value on the `aggregate` object', () => {

    const data = {
      timeSeries: staticAvg,
      aggregate: {
        dischargeThreshold: 0,
        chargeThreshold: 0,
      },
    }
    const options = {
      power: .001,
      energy: (1/6) * .001,
      rte: 1,
      dischargeBuffer: 0,
      chargeBuffer: 0,
    }
    const actual = findAggregateRevenue(data, 'lmp', 6, options).aggregate.charge
    const expected = 0
    expect(actual).toEqual(expected)
  })

  test('should return a different `revenue` value with different charge/discharge thresholds', () => {

    const data = {
      timeSeries: staticAvg,
      aggregate: {
        dischargeThreshold: 1,
        chargeThreshold: 1,
      },
    }
    const options = {
      power: .001,
      energy: (1/6) * .001,
      rte: 1,
      dischargeBuffer: 0,
      chargeBuffer: 0,
    }
    const actual = findAggregateRevenue(data, 'lmp', 6, options).aggregate.revenue
    const expected = .00083
    expect(actual).toBeCloseTo(expected, 5)
  })

  test('should return the same `revenue` value with added energy and buffer values given a larger energy value', () => {

    const data = {
      timeSeries: staticAvg,
      aggregate: {
        dischargeThreshold: 0,
        chargeThreshold: 0,
      },
    }
    const options = {
      power: .001,
      energy: 1.25 * (1/6) * .001,
      rte: 1,
      dischargeBuffer: .1, //percentages of battery energy
      chargeBuffer: .1,
    }
    const actual = findAggregateRevenue(data, 'lmp', 6, options).aggregate.revenue
    const expected = .0005
    expect(actual).toEqual(expected)
  })

  test('should return a lower `revenue` value with a `rte` value', () => {

    const data = {
      timeSeries: staticAvg,
      aggregate: {
        dischargeThreshold: 0,
        chargeThreshold: 0,
      },
    }
    const options = {
      power: .001,
      energy: 1.25 * (1/6) * .001,
      rte: .8,
      dischargeBuffer: .1,
      chargeBuffer: .1,
    }
    const actual = findAggregateRevenue(data, 'lmp', 6, options).aggregate.revenue
    const expected = .0003167
    expect(actual).toBeCloseTo(expected, 6)
  })
})

describe('findThresholds', () => {

  const period = 6
  const key = 'lmp'
  const getThresholdData = composeData(
    calculateMovingAverage,
    calculateScore,
    findThresholds,
  )

  const mockData = [
    {
      timestamp: 1538710500000,
      lmp: 4,
    },
    {
      timestamp: 1538710500000,
      lmp: 3,
    },
    {
      timestamp: 1538710800000,
      lmp: 2,
    },
    {
      timestamp: 1538711100000,
      lmp: 1,
    },
    {
      timestamp: 1538711400000,
      lmp: 5,
    },
    {
      timestamp: 1538711700000,
      lmp: 6,
    },
    {
      timestamp: 1538712000000,
      lmp: 7,
    },
  ]

  const staticAvg = [
    {
     lmp: 3,
     mvgAvg: 4,
     score: -0.14285714285714285,
     timestamp: 1538710500000,
    },
    {
     lmp: 2,
     mvgAvg: 4,
     score: -0.3333333333333333,
     timestamp: 1538710800000,
    },
    {
     lmp: 1,
     mvgAvg: 4,
     score: -0.6,
     timestamp: 1538711100000,
    },
    {
     lmp: 5,
     mvgAvg: 4,
     score: 0.6666666666666666,
     timestamp: 1538711400000,
    },
    {
     lmp: 6,
     mvgAvg: 4,
     score: 0.7142857142857143,
     timestamp: 1538711700000,
    },
    {
     lmp: 7,
     mvgAvg: 4,
     score: 0.75,
     timestamp: 1538712000000,
    },
  ]

  // test('should return a `timeSeries` array', () => {
  //   const actual = getThresholdData(mockData, key, period, {}).timeSeries
  //   const expected = [
  //     {
  //      lmp: 3,
  //      mvgAvg: 3.5,
  //      score: -0.14285714285714285,
  //      timestamp: 1538710500000,
  //     },
  //     {
  //      lmp: 2,
  //      mvgAvg: 3,
  //      score: -0.3333333333333333,
  //      timestamp: 1538710800000,
  //     },
  //     {
  //      lmp: 1,
  //      mvgAvg: 2.5,
  //      score: -0.6,
  //      timestamp: 1538711100000,
  //     },
  //     {
  //      lmp: 5,
  //      mvgAvg: 3,
  //      score: 0.6666666666666666,
  //      timestamp: 1538711400000,
  //     },
  //     {
  //      lmp: 6,
  //      mvgAvg: 3.5,
  //      score: 0.7142857142857143,
  //      timestamp: 1538711700000,
  //     },
  //     {
  //      lmp: 7,
  //      mvgAvg: 4,
  //      score: 0.75,
  //      timestamp: 1538712000000,
  //     },
  //   ]
  //   expect(actual).toEqual(expected)
  // })

  // test('should return a `dischargeThreshold` value on the `aggregate` object', () => {
  //
  //   const data = {
  //     timeSeries: mockData,
  //     aggregate: {},
  //   }
  //   const options = {
  //     power: .001,
  //     energy: (1/6) * .001,
  //     rte: 1,
  //   }
  //   const actual = getThresholdData(mockData, key, period, {}).aggregate.dischargeThreshold
  //   expect(actual).toBeDefined()
  // })
  //
  // test('should return a `chargeThreshold` value on the `aggregate` object', () => {
  //
  //   const data = {
  //     timeSeries: mockData,
  //     aggregate: {},
  //   }
  //   const options = {
  //     power: .001,
  //     energy: (1/6) * .001,
  //     rte: 1,
  //   }
  //   const actual = getThresholdData(mockData, key, period, {}).aggregate.chargeThreshold
  //   expect(actual).toBeDefined()
  // })

  // test('should return reasonable `chargeThreshold` and `dischargeThreshold` values on the `aggregate` object', () => {
  //
  //   const data = {
  //     timeSeries: mockData,
  //     aggregate: {},
  //   }
  //   const options = {
  //     power: .001,
  //     energy: (1/6) * .001,
  //     rte: 1,
  //   }
  //   const actual = getThresholdData(mockData, key, period, options).aggregate
  //   const expected = {
  //     chargeThreshold: 2,
  //     dischargeThreshold: 2,
  //   }
  //   expect(actual).toEqual(expected)
  // })

  // test('should return reasonable `chargeThreshold` and `dischargeThreshold` values on the `aggregate` object', () => {
  //
  //   const data = {
  //     timeSeries: staticAvg,
  //     aggregate: {},
  //   }
  //   const options = {
  //     power: .001,
  //     energy: (1/6) * .001,
  //     rte: 1,
  //     dischargeBuffer: 0,
  //     chargeBuffer: 0,
  //   }
  //   const actual = findThresholds(data, key, period, options).aggregate
  //   const expected = {
  //     chargeThreshold: 2,
  //     dischargeThreshold: 2,
  //   }
  //   expect(actual).toEqual(expected)
  // })
})

describe('findStdDev', () => {
  const period = 5
  const key = 'lmp'
  const getStdDev = composeData(
    findStdDev,
  )

  const dataSnippet = [
    {
      timestamp: 1538710500000,
      congestionPrc: 0,
      energyPrc: 28.02027,
      ghgPrc: 0,
      lossPrc: -0.38948,
      lmp: 27.63079,
    },
    {
      timestamp: 1538710800000,
      congestionPrc: 0,
      energyPrc: 26.79269,
      ghgPrc: 0,
      lossPrc: -0.37242,
      lmp: 26.42027,
    },
    {
      timestamp: 1538711100000,
      congestionPrc: 0,
      energyPrc: 26.83094,
      ghgPrc: 0,
      lossPrc: -0.36758,
      lmp: 26.46335,
    },
    {
      timestamp: 1538711400000,
      congestionPrc: 0,
      energyPrc: 26.76948,
      ghgPrc: 0,
      lossPrc: -0.36674,
      lmp: 26.40274,
    },
    {
      timestamp: 1538711700000,
      congestionPrc: 0,
      energyPrc: 27.86177,
      ghgPrc: 0,
      lossPrc: -0.38171,
      lmp: 27.48006,
    },
    {
      timestamp: 1538712000000,
      congestionPrc: 0,
      energyPrc: 32.1997,
      ghgPrc: 0,
      lossPrc: -0.4025,
      lmp: 31.79721,
    },
    {
      timestamp: 1538712300000,
      congestionPrc: -25.06595,
      energyPrc: 47.8386,
      ghgPrc: 0,
      lossPrc: -0.59798,
      lmp: 22.17467,
    }
  ]

  test('should return the passed in data', () => {
    const actual = getStdDev(dataSnippet, key, period).timeSeries
    const expected = dataSnippet
    expect(actual).toEqual(expected)
  })

  test('should return a `stdDev` value in the `aggregate` portion', () => {
    const actual = getStdDev(dataSnippet, key, period).aggregate.stdDev
    expect(actual).toBeDefined()
  })

  test('returns a correct value for `stdDev`', () => {
    const actual = getStdDev(dataSnippet, key, period).aggregate.stdDev
    const expected = 2.614501392
    expect(actual).toBeCloseTo(expected, 6)
  })
})

describe('testOptimization', () => {
  test('should return something like -1.5 for the argument for y = x^2 + 3x', () => {
    const actual = testOptimization().argument[0]
    const expected = 1.50
    expect(actual).toBeCloseTo(expected, 2)
  })

  test('should return something like -2.25 for the `fncvalue` for y = x^2 + 3x', () => {
    const actual = testOptimization().fncvalue
    const expected = -2.25
    expect(actual).toBeCloseTo(expected, 5)
  })
})

describe('findRevenueAndCharge', () => {
  test('should do something with real data', () => {
    const data = [
      {
        timestamp: 1548788100000,
        lmp: 30.81711,
        lossPrc: 1.31858,
        ghgPrc: 0,
        energyPrc: 29.49853,
        congestionPrc: 0,
        mvgAvg: 40.3,
        nodeId: 3969,
        score: -0.23530744416873445
      }
    ]
    const key = 'lmp'
    const batterySpecs = {
      power: 2.5,
      energy: 5,
      rte: 0.85,
      dischargeBuffer: 0,
      chargeBuffer: 0 ,
    }
    const currentState = {
      charge: 0,
      revenue: 0,
    }
    const dischargeThreshold = 0
    const chargeThreshold = 0
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)
    const expected = {
      charge: 0.20833333333333331,
      revenue: -6.42023125,
      status: 'charge',
    }
    expect(actual).toEqual(expected)
  })

  test('should return realistic charge values', () => {
    const data = [
      {
        timestamp: 1548788100000,
        lmp: 30,
        mvgAvg: 40,
      }
    ]
    const key = 'lmp'
    const batterySpecs = {
      power: 2.5,
      energy: 5,
      rte: 0.85,
      dischargeBuffer: 0,
      chargeBuffer: 0 ,
    }
    const currentState = {
      charge: 0,
      revenue: 0,
    }
    const dischargeThreshold = 0
    const chargeThreshold = 0
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)
    const expected = {
      charge: 2.5/12,
      revenue: -2.5 * (30/12),
    }
    expect(actual.revenue).toBeCloseTo(expected.revenue, 10)
    expect(actual.charge).toBeCloseTo(expected.charge, 10)
  })

  test('should charge from zero correctly', () => {
    const data = [
      {
        timestamp: 1548788100000,
        lmp: 30, //$/MWh
        mvgAvg: 40,
      }
    ]
    const key = 'lmp'
    const batterySpecs = {
      power: 1, //MW
      energy: 1, //MWh
      rte: 1, //%
      dischargeBuffer: 0,
      chargeBuffer: 0 ,
    }
    const currentState = {
      charge: 0, //MWh
      revenue: 0, //$
    }
    const dischargeThreshold = 0
    const chargeThreshold = 0
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)
    const expected = {
      charge: 1/12,
      revenue: -30/12,
      status: 'charge',
    }
    expect(actual).toEqual(expected)
  })

  test('should charge from an existing level correctly', () => {
    const data = [
      {
        timestamp: 1548788100000,
        lmp: 30, //$/MWh
        mvgAvg: 40,
      }
    ]
    const key = 'lmp'
    const batterySpecs = {
      power: 1, //MW
      energy: 1, //MWh
      rte: 1, //%
      dischargeBuffer: 0,
      chargeBuffer: 0 ,
    }
    const currentState = {
      charge: 1/12,
      revenue: -30/12,
    }
    const dischargeThreshold = 0
    const chargeThreshold = 0
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)
    const expected = {
      charge: 1/6,
      revenue: -30/6,
      status: 'charge',
    }
    expect(actual).toEqual(expected)
  })

  test('should not charge from zero if the price is not below the charge threshold', () => {
    const data = [
      {
        timestamp: 1548788100000,
        lmp: 36, //$/MWh
        mvgAvg: 40,
      }
    ]
    const key = 'lmp'
    const batterySpecs = {
      power: 1, //MW
      energy: 1, //MWh
      rte: 1, //%
      dischargeBuffer: 0,
      chargeBuffer: 0 ,
    }
    const currentState = {
      charge: 0, //%
      revenue: 0, //$
    }
    const dischargeThreshold = 5
    const chargeThreshold = 5
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)
    const expected = {
      charge: 0,
      revenue: 0,
      status: 'standby',
    }
    expect(actual).toEqual(expected)
  })

  test('should not charge from a non-zero level if the price is not below the charge threshold', () => {
    const data = [
      {
        timestamp: 1548788100000,
        lmp: 36, //$/MWh
        mvgAvg: 40,
      }
    ]
    const key = 'lmp'
    const batterySpecs = {
      power: 1, //MW
      energy: 1, //MWh
      rte: 1, //%
      dischargeBuffer: 0,
      chargeBuffer: 0 ,
    }
    const currentState = {
      charge: 1/12,
      revenue: -30/12,
    }
    const dischargeThreshold = 5
    const chargeThreshold = 5
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)
    const expected = {
      charge: 1/12,
      revenue: -30/12,
      status: 'standby',
    }
    expect(actual).toEqual(expected)
  })

  test('should not discharge from zero', () => {
    const data = [
      {
        timestamp: 1548788100000,
        lmp: 46, //$/MWh
        mvgAvg: 40,
      }
    ]
    const key = 'lmp'
    const batterySpecs = {
      power: 1, //MW
      energy: 1, //MWh
      rte: 1, //%
      dischargeBuffer: 0,
      chargeBuffer: 0 ,
    }
    const currentState = {
      charge: 0,
      revenue: -30/12,

    }
    const dischargeThreshold = 5
    const chargeThreshold = 5
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)
    const expected = {
      charge: 0,
      revenue: -30/12,
      status: 'standby',
    }
    expect(actual).toEqual(expected)
  })

  test('should not discharge from a non-zero level if the price is not above the discharge threshold', () => {
    const data = [
      {
        timestamp: 1548788100000,
        lmp: 44, //$/MWh
        mvgAvg: 40,
      }
    ]
    const key = 'lmp'
    const batterySpecs = {
      power: 1, //MW
      energy: 1, //MWh
      rte: 1, //%
      dischargeBuffer: 0,
      chargeBuffer: 0 ,
    }
    const currentState = {
      charge: 2/12,
      revenue: -30/12,
    }
    const dischargeThreshold = 5
    const chargeThreshold = 5
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)
    const expected = {
      charge: 2/12,
      revenue: -30/12,
      status: 'standby',
    }
    expect(actual).toEqual(expected)
  })

  test('should discharge from a non-zero level if the price is above the discharge threshold', () => {
    const data = [
      {
        timestamp: 1548788100000,
        lmp: 46, //$/MWh
        mvgAvg: 40,
      }
    ]
    const key = 'lmp'
    const batterySpecs = {
      power: 1, //MW
      energy: 1, //MWh
      rte: 1, //%
      dischargeBuffer: 0,
      chargeBuffer: 0 ,
    }
    const currentState = {
      charge: 2/12,
      revenue: -30/12,
    }
    const dischargeThreshold = 5
    const chargeThreshold = 5
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)
    const expected = {
      charge: 1/12,
      revenue: 16/12,
      status: 'discharge',
    }
    expect(actual.charge).toBeCloseTo(expected.charge, 10)
    expect(actual.revenue).toBeCloseTo(expected.revenue, 10)
    expect(actual.status).toBe('discharge')

  })
})

describe('findUpperAndLowerValues', () => {
  const period = 5
  const key = 'lmp'
  const getDeviations = composeData(
    calculateMovingAverage,
    findUpperAndLowerValues,
  )

  const dataSnippet = [
    {
      timestamp: 1538710500000,
      congestionPrc: 0,
      energyPrc: 28.02027,
      ghgPrc: 0,
      lossPrc: -0.38948,
      lmp: 27.63079,
    },
    {
      timestamp: 1538710800000,
      congestionPrc: 0,
      energyPrc: 26.79269,
      ghgPrc: 0,
      lossPrc: -0.37242,
      lmp: 26.42027,
    },
    {
      timestamp: 1538711100000,
      congestionPrc: 0,
      energyPrc: 26.83094,
      ghgPrc: 0,
      lossPrc: -0.36758,
      lmp: 26.46335,
    },
    {
      timestamp: 1538711400000,
      congestionPrc: 0,
      energyPrc: 26.76948,
      ghgPrc: 0,
      lossPrc: -0.36674,
      lmp: 26.40274,
    },
    {
      timestamp: 1538711700000,
      congestionPrc: 0,
      energyPrc: 27.86177,
      ghgPrc: 0,
      lossPrc: -0.38171,
      lmp: 27.48006,
    },
    {
      timestamp: 1538712000000,
      congestionPrc: 0,
      energyPrc: 32.1997,
      ghgPrc: 0,
      lossPrc: -0.4025,
      lmp: 31.79721,
    },
    {
      timestamp: 1538712300000,
      congestionPrc: -25.06595,
      energyPrc: 47.8386,
      ghgPrc: 0,
      lossPrc: -0.59798,
      lmp: 22.17467,
    }
  ]

  test('should return the timeseries', () => {
    const actual = getDeviations(dataSnippet, key, period).timeSeries
    expect(actual).toBeDefined()
  })

  test('should return a `aboveStdDev` value in the `aggregate` portion', () => {
    const actual = getDeviations(dataSnippet, key, period).aggregate.aboveStdDev
    expect(actual).toBeDefined()
  })

  test('should return a `belowStdDev` value in the `aggregate` portion', () => {
    const actual = getDeviations(dataSnippet, key, period).aggregate.belowStdDev
    expect(actual).toBeDefined()
  })

  test('returns a correct value for `aboveStdDev`', () => {
    const actual = getDeviations(dataSnippet, key, period).aggregate.aboveStdDev
    const expected = 2.158575
    expect(actual).toBeCloseTo(expected, 6)
  })

  test('returns a correct value for `belowStdDev`', () => {
    const actual = getDeviations(dataSnippet, key, period).aggregate.belowStdDev
    const expected = 1.842219
    expect(actual).toBeCloseTo(expected, 6)
  })

  test('returns a correct value for `aboveMean`', () => {
    const actual = getDeviations(dataSnippet, key, period).aggregate.aboveMean
    const expected = 29.638635
    expect(actual).toBeCloseTo(expected, 6)
  })

  test('returns a correct value for `belowMean`', () => {
    const actual = getDeviations(dataSnippet, key, period).aggregate.belowMean
    const expected = 25.365257
    expect(actual).toBeCloseTo(expected, 6)
  })

  test('returns a correct value for `aboveMax`', () => {
    const actual = getDeviations(dataSnippet, key, period).aggregate.aboveMax
    const expected = 31.79721
    expect(actual).toEqual(expected)
  })

  test('returns a correct value for `aboveMin`', () => {
    const actual = getDeviations(dataSnippet, key, period).aggregate.aboveMin
    const expected = 27.48006
    expect(actual).toEqual(expected)
  })
})

test('getCenteredValuesArr should return a range of values from a centered value in both directions to a absolute value', () => {
  const actual = getCenteredValuesArr(5, 1, 3)
  const expected = [2, 3, 4, 5, 6, 7, 8]
  expect(actual).toEqual(expected)
})

test('getTwoDimensionalArray should return a array with n^2 sub arrays', () => {
  const xArr = getCenteredValuesArr(3, 1, 1)
  //[2, 3, 4]
  const yArr = getCenteredValuesArr(8, 1, 1)
  //[7, 8, 9]
  const actual = getTwoDimensionalArray(xArr, yArr)
  const expected = [
    [2, 7],
    [2, 8],
    [2, 9],
    [3, 7],
    [3, 8],
    [3, 9],
    [4, 7],
    [4, 8],
    [4, 9],
  ]
  expect(actual).toEqual(expected)
})
