const lmp1Hour = require('./mocks/lmp1Hour')
const lmp1Day = require('./mocks/lmp1Day')
const apNodes = require('./mocks/apNodes')

const {
  parsePriceData,
  parseAtlasData,
} = require('../parsers')

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

describe('parseAtlasData()', () => {

  test('should return an array', () => {
    const query = 'ATL_APNODE&APnode_type=ALL'
    const data = apNodes
    const expected = true
    const actual = Array.isArray(parseAtlasData(query, data))
    expect(actual).toEqual(expected)
  })

  test('should return an array with 12 items', () => {
    const query = 'ATL_APNODE&APnode_type=ALL'
    const data = apNodes
    const expected = 1527
    const actual = parseAtlasData(query, data).length
    expect(actual).toEqual(expected)
  })

  test('should return an array with 12 items, each including a `name`, `start_date`, `end_date`, `type`, and `max_mw` key', () => {
    const query = 'ATL_APNODE&APnode_type=ALL'
    const data = apNodes
    const expected = new Array(1527).fill(true)
    const arr = parseAtlasData(query, data)
    const keyArr = arr.map( obj => Object.keys(obj) )
    const actual = keyArr.map( k =>
      k.includes('name') &&
      k.includes('start_date') &&
      k.includes('end_date') &&
      k.includes('type') &&
      k.includes('max_mw')
    )
    expect(actual).toEqual(expected)
  })

  test('should return an array with 12 items, where the values of the `start_date`, `end_date`, and `max_mw` properties are numbers', () => {
    const query = 'ATL_APNODE&APnode_type=ALL'
    const data = apNodes
    const expected = new Array(1527).fill(true)
    const arr = parseAtlasData(query, data)
    const actual = arr.map( obj =>
      typeof obj.start_date === 'number' &&
      typeof obj.end_date === 'number' &&
      typeof obj.max_mw === 'number'
    )
    expect(actual).toEqual(expected)
  })
})
