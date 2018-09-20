const moment = require('moment-timezone')

const {
  getUrl,
  parseCaisoData,
} = require('../caisoEndpoint')
const lmp1Hour = require('../../utils/mocks/lmp1Hour.json')

describe('caisoUrlBuilder()', () => {

  test('should return a url with start date, end date, and query name', () => {
    const start = moment.tz(1537282770441, 'Etc/GMT')
    const end = moment.tz(1537369170441, 'Etc/GMT')
    const expected = 'http://oasis.caiso.com/oasisapi/SingleZip?queryname=PRC_INTVL_LMP&startdatetime=20180918T14:59-0000&enddatetime=20180919T14:59-0000&version=1&market_run_id=RTM&node=LAPLMG1_7_B2'
    const actual = getUrl(start, end, 'PRC_INTVL_LMP')
    expect(actual).toEqual(expected)
  })
})

describe('parseCaisoData()', () => {

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
    const actual = Array.isArray(parseCaisoData(query, data))
    expect(actual).toEqual(expected)
  })

  test('should return an array with 12 items', () => {
    const query = 'PRC_INTVL_LMP'
    const data = lmp1Hour
    const expected = 12
    const actual = parseCaisoData(query, data).length
    expect(actual).toEqual(expected)
  })

  test('should return an array with 12 items, each including a `timestamp` key', () => {
    const query = 'PRC_INTVL_LMP'
    const data = lmp1Hour
    const expected = new Array(12).fill(true)
    const arr = parseCaisoData(query, data)
    const keyArr = arr.map( obj => Object.keys(obj) )
    const actual = keyArr.map( k => k.includes('timestamp'))
    expect(actual).toEqual(expected)
  })

  test('should return an array with 12 items, each including a `timestamp` and a `congestionPrc` key', () => {
    const query = 'PRC_INTVL_LMP'
    const data = lmp1Hour
    const expected = new Array(12).fill(true)
    const arr = parseCaisoData(query, data)
    const keyArr = arr.map( obj => Object.keys(obj) )
    const actual = keyArr.map( k => k.includes('timestamp') && k.includes('congestionPrc'))
    expect(actual).toEqual(expected)
  })

  test('should return an array with 12 items, each including a `timestamp`, `congestionPrc`, `energyPrc`, `lossPrc` and a `lmp` key', () => {
    const query = 'PRC_INTVL_LMP'
    const data = lmp1Hour
    const expected = new Array(12).fill(true)
    const arr = parseCaisoData(query, data)
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
    const arr = parseCaisoData(query, data)
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
    const arr = parseCaisoData(query, data)
    const actual = arr.map( obj =>
      typeof obj.timestamp === 'number'
    )
    expect(actual).toEqual(expected)
  })


})
