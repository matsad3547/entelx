const moment = require('moment-timezone')

const { getUrl } = require('../caisoEndpoint')

describe('caisoUrlBuilder()', () => {
  test('should return a url with start date, end date, and query name', () => {
    const start = moment.tz(1537282770441, 'America/Los_Angeles')
    const end = moment.tz(1537369170441, 'America/Los_Angeles')
    const expected = 'http://oasis.caiso.com/oasisapi/SingleZip?queryname=PRC_INTVL_LMP&startdatetime=20180918T07:59-3030&enddatetime=20180919T07:59-3030&version=1&market_run_id=RTM&node=LAPLMG1_7_B2'
    const actual = getUrl(start, end, 'PRC_INTVL_LMP')
    expect(actual).toEqual(expected)
  })
})
