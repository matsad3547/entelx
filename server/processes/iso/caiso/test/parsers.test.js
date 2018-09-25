const lmp1Hour = require('./mocks/lmp1Hour')
const lmp1Day = require('./mocks/lmp1Day')

const { parsePriceData } = require('../parsers')

describe('parsePriceData()', () => {

  // I have:
  // 'REPORT_ITEM': [
  //   {
  //     'REPORT_HEADER': {} //useless!
  //     'REPORT_DATA': [
  //       "DATA_ITEM": {
  //         "_text": "LMP_CONG_PRC"
  //       },
  //       // ...some other stuff
  //       "INTERVAL_END_GMT": {
  //         "_text": "2018-09-20T01:40:00-00:00"
  //       },
  //       "VALUE": {
  //         "_text": "0.21427"
  //       },
  //       // ...more of these
  //     ],
  //
  //   }
  //   // ...pattern repeats for each data item
  // ]

  // I want an array of:
  // {
  //   timeStamp: millis,
  //   congestionPrc: number,
  //   energyPrc: number,
  //   lossPrc: number,
  //   lmp: number,
  // }

  test('should return an array', () => {
    const query = 'PRC_INTVL_LMP'
    const data = lmp1Hour
    const expected = true
    const actual = Array.isArray(parsePriceData(query, data))
    expect(actual).toEqual(expected)
  })

  test('should return an array with 12 items', () => {
    const query = 'PRC_INTVL_LMP'
    const data = lmp1Hour
    const expected = 12
    const actual = parsePriceData(query, data).length
    expect(actual).toEqual(expected)
  })

  test('should return an array with 12 items, each including a `timestamp` key', () => {
    const query = 'PRC_INTVL_LMP'
    const data = lmp1Hour
    const expected = new Array(12).fill(true)
    const arr = parsePriceData(query, data)
    const keyArr = arr.map( obj => Object.keys(obj) )
    const actual = keyArr.map( k => k.includes('timestamp'))
    expect(actual).toEqual(expected)
  })

  test('should return an array with 12 items, each including a `timestamp` and a `congestionPrc` key', () => {
    const query = 'PRC_INTVL_LMP'
    const data = lmp1Hour
    const expected = new Array(12).fill(true)
    const arr = parsePriceData(query, data)
    const keyArr = arr.map( obj => Object.keys(obj) )
    const actual = keyArr.map( k => k.includes('timestamp') && k.includes('congestionPrc'))
    expect(actual).toEqual(expected)
  })

  test('should return an array with 12 items, each including a `timestamp`, `congestionPrc`, `energyPrc`, `lossPrc` and a `lmp` key', () => {
    const query = 'PRC_INTVL_LMP'
    const data = lmp1Hour
    const expected = new Array(12).fill(true)
    const arr = parsePriceData(query, data)
    const keyArr = arr.map( obj => Object.keys(obj) )
    const actual = keyArr.map( k =>
      k.includes('timestamp') &&
      k.includes('congestionPrc') &&
      k.includes('energyPrc') &&
      k.includes('lossPrc') &&
      k.includes('lmp')
    )
    expect(actual).toEqual(expected)
  })

  test('should return an array with 12 items, where the values of the `congestionPrc`, `energyPrc`, `lossPrc` and `lmp` properties are numbers', () => {
    const query = 'PRC_INTVL_LMP'
    const data = lmp1Hour
    const expected = new Array(12).fill(true)
    const arr = parsePriceData(query, data)
    const actual = arr.map( obj =>
      typeof obj.congestionPrc === 'number' &&
      typeof obj.energyPrc === 'number' &&
      typeof obj.lossPrc === 'number' &&
      typeof obj.lmp === 'number'
    )
    expect(actual).toEqual(expected)
  })

  test('should return an array with 12 items, where the value of the `timestamp` is a number', () => {
    const query = 'PRC_INTVL_LMP'
    const data = lmp1Hour
    const expected = new Array(12).fill(true)
    const arr = parsePriceData(query, data)
    const actual = arr.map( obj =>
      typeof obj.timestamp === 'number'
    )
    expect(actual).toEqual(expected)
  })

  test('should return an array with 288 items', () => {
    const query = 'PRC_INTVL_LMP'
    const data = lmp1Day
    const expected = 288
    const actual = parsePriceData(query, data).length
    expect(actual).toEqual(expected)
  })
})
