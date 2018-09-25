const moment = require('moment-timezone')

const { getUrl } = require('../utils')

describe('caisoUrlBuilder()', () => {

  test('should return a url with start date, end date, and query name', () => {
    const start = moment.tz(1537282770441, 'Etc/GMT')
    const end = moment.tz(1537369170441, 'Etc/GMT')
    const expected = 'http://oasis.caiso.com/oasisapi/SingleZip?queryname=PRC_INTVL_LMP&startdatetime=20180918T14:59-0000&enddatetime=20180919T14:59-0000&version=1&market_run_id=RTM&node=LAPLMG1_7_B2'
    const actual = getUrl(
      start,
      end,
      'PRC_INTVL_LMP',
      'RTM',
      'LAPLMG1_7_B2',
    )
    expect(actual).toEqual(expected)
  })
})
