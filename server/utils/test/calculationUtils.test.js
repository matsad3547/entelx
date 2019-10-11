const {
  composeData,
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
  calculateMean,
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
  const data = {
    timeSeries: testData,
    aggregate: {agr: true}
  }
  const composed = composeData(st)
  const actual = composed(data)
  const expected = {
    timeSeries: testData,
    aggregate: {agr: true},
  }
  expect(actual).toEqual(expected)
})

describe('findMinMax', () => {

  const options = {
    period: 5,
  }
  const key = 'val'
  const getMinMaxData = composeData(
    findMinMax,
  )

  const data = {
    timeSeries: testData,
    aggregate: {agr: true}
  }

  test('should return an `aggregate` object with a correct `max` value', () => {
    const actual = getMinMaxData(data, key, options).aggregate.max
    const expected = 8
    expect(actual).toEqual(expected)
  })

  test('should return an `aggregate` object with a correct `min` value', () => {
    const actual = getMinMaxData(data, key, options).aggregate.min
    const expected = -1
    expect(actual).toEqual(expected)
  })
})

test('calculateDerivedData should work', () => {
  const data = {
    timeSeries: testData,
    aggregate: {}
  }
  const actual = calculateDerivedData(data, 'val', {period: 5})
  expect(actual).toBeDefined()
})


describe('findInflections', () => {

  const options = {
    period: 5,
  }

  const getInflectionData = composeData(
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

  const data = {
    timeSeries: dataSnippet,
    aggregate: {agr: true}
  }

  test('should return an array for `inflections`', () => {
    const actual = Array.isArray(getInflectionData(data, 'lmp', options).aggregate.inflections)
    expect(actual).toEqual(true)
  })


  // TODO Use data with `mvg_avg` and `score`
  // test('should return an array of inflection timestamps', () => {
  //   const actual = getInflectionData(dataSnippet, 'lmp', options).aggregate.inflections
  //
  //   const expected = [
  //     1538710800000,
  //     1538711700000,
  //     1538712300000,
  //   ]
  //   expect(actual).toEqual(expected)
  // })
})

describe('findAggregateRevenue', () => {

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

  test('should return a `revenue` value on the `aggregate` object', () => {

    const data = {
      timeSeries: staticAvg,
      aggregate: {
        mean: 4,
        dischargeThreshold: 0,
        chargeThreshold: 0,
      },
    }
    const options = {
      period: 6,
      power: .001,
      energy: (1/6) * .001,
      rte: 1,
      dischargeBuffer: 0,
      chargeBuffer: 0,
    }
    const actual = findAggregateRevenue(data, 'lmp', options).aggregate.revenue
    const expected = 0
    expect(actual).toEqual(expected)
  })

  test('should return a `charge` value on the `aggregate` object', () => {

    const data = {
      timeSeries: staticAvg,
      aggregate: {
        mean: 4,
        dischargeThreshold: 0,
        chargeThreshold: 0,
      },
    }
    const options = {
      period: 6,
      power: .001,
      energy: (1/6) * .001,
      rte: 1,
      dischargeBuffer: 0,
      chargeBuffer: 0,
    }
    const actual = findAggregateRevenue(data, 'lmp', options).aggregate.charge
    const expected = 0
    expect(actual).toEqual(expected)
  })

  test('should return a different `revenue` value with different charge/discharge thresholds', () => {

    const data = {
      timeSeries: staticAvg,
      aggregate: {
        mean: 4,
        dischargeThreshold: 1,
        chargeThreshold: 1,
      },
    }
    const options = {
      period: 6,
      power: .001,
      energy: (1/6) * .001,
      rte: 1,
      dischargeBuffer: 0,
      chargeBuffer: 0,
    }
    const actual = findAggregateRevenue(data, 'lmp', options).aggregate.revenue
    const expected = 0
    expect(actual).toBeCloseTo(expected, 5)
  })

  test('should return the same `revenue` value with added energy and buffer values given a larger energy value', () => {

    const data = {
      timeSeries: staticAvg,
      aggregate: {
        mean: 4,
        dischargeThreshold: 0,
        chargeThreshold: 0,
      },
    }
    const options = {
      period: 6,
      power: .001,
      energy: 1.25 * (1/6) * .001,
      rte: 1,
      dischargeBuffer: .1, //percentages of battery energy
      chargeBuffer: .1,
    }
    const actual = findAggregateRevenue(data, 'lmp', options).aggregate.revenue
    const expected = 0
    expect(actual).toEqual(expected)
  })

  test('should return a lower `revenue` value with a `rte` value', () => {

    const data = {
      timeSeries: staticAvg,
      aggregate: {
        mean: 4,
        dischargeThreshold: 0,
        chargeThreshold: 0,
      },
    }
    const options = {
      period: 6,
      power: .001,
      energy: 1.25 * (1/6) * .001,
      rte: .8,
      dischargeBuffer: .1,
      chargeBuffer: .1,
    }
    const actual = findAggregateRevenue(data, 'lmp', options).aggregate.revenue
    const expected = 0
    expect(actual).toBeCloseTo(expected, 6)
  })
})

describe('findThresholds', () => {

  const key = 'lmp'
  const getThresholdData = composeData(
    calculateMean,
    findUpperAndLowerValues,
    findThresholds,
  )

  const mockData = [
    {
      timestamp: 1538710500000,
      lmp: 40,
    },
    {
      timestamp: 1538710500000,
      lmp: 3,
    },
    {
      timestamp: 1538710800000,
      lmp: 20,
    },
    {
      timestamp: 1538711100000,
      lmp: 1,
    },
    {
      timestamp: 1538711400000,
      lmp: 50,
    },
    {
      timestamp: 1538711700000,
      lmp: 6,
    },
    {
      timestamp: 1538712000000,
      lmp: 70,
    },
  ]

  const options = {
    power: 1,
    energy: 2,
    rte: .85,
    dischargeBuffer: 0,
    chargeBuffer: 0,
  }

  const data = {
    timeSeries: mockData,
    aggregate: {}
  }

  test('should return a `timeSeries` array and an `aggregate` object', () => {
    const actual = Object.keys(getThresholdData(data, key, options))
    const expected = ['timeSeries', 'aggregate']
    expect(actual).toEqual(expected)
  })

  test('should return an `aggregate` object with `mean`, `dischargeThreshold`, `chargeThreshold`, `aboveStdDev`, `belowStdDev`, `aboveMean`, `belowMean`, `aboveMax`, `aboveMin`, `belowMax`, `belowMin`, `aboveN`, and `belowN` keys', () => {
    const actual = Object.keys(getThresholdData(data, key, options).aggregate)
    const expected = [
      'mean',
      'aboveStdDev',
      'belowStdDev',
      'aboveMean',
      'belowMean',
      'aboveMax',
      'aboveMin',
      'belowMax',
      'belowMin',
      'aboveN',
      'belowN',
      'chargeThreshold',
      'dischargeThreshold',
    ]
    expect(actual).toEqual(expected)
  })

  test('should return a real value for `chargeThreshold`', () => {
    const chargeThreshold = getThresholdData(data, key, options).aggregate.chargeThreshold
    const expected = 6.013
    expect(chargeThreshold).toBeCloseTo(expected, 3)
  })

  test('should return a real value for `dischargeThreshold`', () => {
    const chargeThreshold = getThresholdData(data, key, options).aggregate.dischargeThreshold
    const expected = 15.917
    expect(chargeThreshold).toBeCloseTo(expected, 3)
  })
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

  const data = {
    timeSeries: dataSnippet,
    aggregate: {}
  }

  test('should return the passed in data', () => {
    const actual = getStdDev(data, key, period).timeSeries
    const expected = dataSnippet
    expect(actual).toEqual(expected)
  })

  test('should return a `stdDev` value in the `aggregate` portion', () => {
    const actual = getStdDev(data, key, period).aggregate.stdDev
    expect(actual).toBeDefined()
  })

  test('returns a correct value for `stdDev`', () => {
    const actual = getStdDev(data, key, period).aggregate.stdDev
    const expected = 2.614501392
    expect(actual).toBeCloseTo(expected, 6)
  })
})

describe('findRevenueAndCharge', () => {
  test('should do something with real data', () => {
    const data = {
      timeSeries: [
        {
          timestamp: 1548788100000,
          lmp: 30.81711,
          lossPrc: 1.31858,
          ghgPrc: 0,
          energyPrc: 29.49853,
          congestionPrc: 0,
          nodeId: 3969,
          score: -0.23530744416873445,
          mvgAvg: 40.3,
        }
      ]
    }
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
    const chargeThreshold = 31
    const dischargeThreshold = 40
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, chargeThreshold, dischargeThreshold)
    const expected = {
      charge: 0.20833333333333331,
      revenue: -6.42023125,
      status: 'charge',
    }
    expect(actual).toEqual(expected)
  })

  test('should return realistic charge values', () => {
    const data = {
      timeSeries: [
        {
          timestamp: 1548788100000,
          lmp: 30,
        }
      ]
    }
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
    const dischargeThreshold = 40
    const chargeThreshold = 40
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, chargeThreshold, dischargeThreshold)
    const expected = {
      charge: 2.5/12,
      revenue: -2.5 * (30/12),
    }
    expect(actual.revenue).toBeCloseTo(expected.revenue, 10)
    expect(actual.charge).toBeCloseTo(expected.charge, 10)
  })

  test('should charge from zero correctly', () => {
    const data = {
      timeSeries: [
        {
          timestamp: 1548788100000,
          lmp: 30,
        }
      ]
    }
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
    const chargeThreshold = 31
    const dischargeThreshold = 35
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState,  chargeThreshold, dischargeThreshold)
    const expected = {
      charge: 1/12,
      revenue: -30/12,
      status: 'charge',
    }
    expect(actual).toEqual(expected)
  })

  test('should charge from an existing level correctly', () => {
    const data = {
      timeSeries: [
        {
          timestamp: 1548788100000,
          lmp: 30,
        }
      ]
    }
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
    const chargeThreshold = 31
    const dischargeThreshold = 40
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, chargeThreshold,  dischargeThreshold)
    const expected = {
      charge: 1/6,
      revenue: -30/6,
      status: 'charge',
    }
    expect(actual).toEqual(expected)
  })

  test('should not charge from zero if the price is above the charge threshold', () => {
    const data = {
      timeSeries: [
        {
          timestamp: 1548788100000,
          lmp: 36,
        }
      ]
    }
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
    const chargeThreshold = 35
    const dischargeThreshold = 45
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, chargeThreshold, dischargeThreshold)
    const expected = {
      charge: 0,
      revenue: 0,
      status: 'standby',
    }
    expect(actual).toEqual(expected)
  })

  test('should not charge from a non-zero level if the price is above the charge threshold', () => {
    const data = {
      timeSeries: [
        {
          timestamp: 1548788100000,
          lmp: 36,
        }
      ]
    }
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
    const chargeThreshold = 35
    const dischargeThreshold = 45
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, chargeThreshold, dischargeThreshold)
    const expected = {
      charge: 1/12,
      revenue: -30/12,
      status: 'standby',
    }
    expect(actual).toEqual(expected)
  })

  test('should not discharge from zero', () => {
    const data = {
      timeSeries: [
        {
          timestamp: 1548788100000,
          lmp: 46,
        }
      ]
    }
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
    const chargeThreshold = 35
    const dischargeThreshold = 45
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, chargeThreshold, dischargeThreshold)
    const expected = {
      charge: 0,
      revenue: -30/12,
      status: 'standby',
    }
    expect(actual).toEqual(expected)
  })

  test('should not discharge from a non-zero level if the price is below the discharge threshold', () => {
    const data = {
      timeSeries: [
        {
          timestamp: 1548788100000,
          lmp: 44,
        }
      ]
    }
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
    const chargeThreshold = 35
    const dischargeThreshold = 45
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, chargeThreshold, dischargeThreshold)
    const expected = {
      charge: 2/12,
      revenue: -30/12,
      status: 'standby',
    }
    expect(actual).toEqual(expected)
  })

  test('should discharge from a non-zero level if the price is above the discharge threshold', () => {
    const data = {
      timeSeries: [
        {
          timestamp: 1548788100000,
          lmp: 46,
        }
      ]
    }
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
    const chargeThreshold = 35
    const dischargeThreshold = 45
    const actual = findRevenueAndCharge(data, key, batterySpecs, currentState, chargeThreshold, dischargeThreshold)
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

// describe('findUpperAndLowerValues', () => {
//   const options = {period: 5}
//   const key = 'lmp'
//   const getDeviations = composeData(
//     calculateMean,
//     findUpperAndLowerValues,
//   )
//
//   const dataSnippet = [
//     {
//       timestamp: 1538710500000,
//       congestionPrc: 0,
//       energyPrc: 28.02027,
//       ghgPrc: 0,
//       lossPrc: -0.38948,
//       lmp: 27.63079,
//     },
//     {
//       timestamp: 1538710800000,
//       congestionPrc: 0,
//       energyPrc: 26.79269,
//       ghgPrc: 0,
//       lossPrc: -0.37242,
//       lmp: 26.42027,
//     },
//     {
//       timestamp: 1538711100000,
//       congestionPrc: 0,
//       energyPrc: 26.83094,
//       ghgPrc: 0,
//       lossPrc: -0.36758,
//       lmp: 26.46335,
//     },
//     {
//       timestamp: 1538711400000,
//       congestionPrc: 0,
//       energyPrc: 26.76948,
//       ghgPrc: 0,
//       lossPrc: -0.36674,
//       lmp: 26.40274,
//     },
//     {
//       timestamp: 1538711700000,
//       congestionPrc: 0,
//       energyPrc: 27.86177,
//       ghgPrc: 0,
//       lossPrc: -0.38171,
//       lmp: 27.48006,
//     },
//     {
//       timestamp: 1538712000000,
//       congestionPrc: 0,
//       energyPrc: 32.1997,
//       ghgPrc: 0,
//       lossPrc: -0.4025,
//       lmp: 31.79721,
//     },
//     {
//       timestamp: 1538712300000,
//       congestionPrc: -25.06595,
//       energyPrc: 47.8386,
//       ghgPrc: 0,
//       lossPrc: -0.59798,
//       lmp: 22.17467,
//     }
//   ]
//
//   test('should return the timeseries', () => {
//     const actual = getDeviations(dataSnippet, key, options).timeSeries
//     expect(actual).toBeDefined()
//   })
//
//   test('should return a `aboveStdDev` value in the `aggregate` portion', () => {
//     const actual = getDeviations(dataSnippet, key, options).aggregate.aboveStdDev
//     expect(actual).toBeDefined()
//   })
//
//   test('should return a `belowStdDev` value in the `aggregate` portion', () => {
//     const actual = getDeviations(dataSnippet, key, options).aggregate.belowStdDev
//     expect(actual).toBeDefined()
//   })
//
//   test('returns a correct value for `aboveStdDev`', () => {
//     const actual = getDeviations(dataSnippet, key, options).aggregate.aboveStdDev
//     const expected = 2.000543
//     expect(actual).toBeCloseTo(expected, 6)
//   })
//
//   test('returns a correct value for `belowStdDev`', () => {
//     const actual = getDeviations(dataSnippet, key, options).aggregate.belowStdDev
//     const expected = 1.842219
//     expect(actual).toBeCloseTo(expected, 6)
//   })
//
//   test('returns a correct value for `aboveMean`', () => {
//     const actual = getDeviations(dataSnippet, key, options).aggregate.aboveMean
//     const expected = 28.969353
//     expect(actual).toBeCloseTo(expected, 6)
//   })
//
//   test('returns a correct value for `belowMean`', () => {
//     const actual = getDeviations(dataSnippet, key, options).aggregate.belowMean
//     const expected = 25.365257
//     expect(actual).toBeCloseTo(expected, 6)
//   })
//
//   test('returns a correct value for `aboveMax`', () => {
//     const actual = getDeviations(dataSnippet, key, options).aggregate.aboveMax
//     const expected = 31.79721
//     expect(actual).toEqual(expected)
//   })
//
//   test('returns a correct value for `aboveMin`', () => {
//     const actual = getDeviations(dataSnippet, key, options).aggregate.aboveMin
//     const expected = 27.48006
//     expect(actual).toEqual(expected)
//   })
// })

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

describe('calculateMean', () => {
  const key = 'val'
  const getMeanData = composeData(
    calculateMean,
  )

  const data = {
    timeSeries: testData,
    aggregate: {}
  }

  test('should return a `timeSeries` and `aggregate` properties', () => {
    const expected = ['timeSeries', 'aggregate']
    const actual = Object.keys(getMeanData(data, key))
    expect(actual).toEqual(expected)
  })

  test('should return a `mean` property on the `aggregate` property', () => {
    const expected = ['mean']
    const actual = Object.keys(getMeanData(data, key).aggregate)
    expect(actual).toEqual(expected)
  })

  test('should return a `mean` property on the `aggregate` property', () => {
    const expected = 3.83333
    const actual = getMeanData(data, key).aggregate.mean
    expect(actual).toBeCloseTo(expected, 5)
  })
})
