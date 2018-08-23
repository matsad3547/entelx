const parseCAISOResponse = require('../getLMP').parseCAISOResponse

describe('parseCAISOResponse', () => {
  let throttleMessage, dataStr, parsedData

  beforeEach( () => {
    throttleMessage =  "CAISO: retrying in 5 seconds (5 retries remaining), throttled for http://oasis.caiso.com/oasisapi/SingleZip, {'params': {'node': ['SLAP_PGP2-APND'], 'version': 1, 'startdatetime': '20180823T15:04-0000', 'market_run_id': 'RTM', 'queryname': 'PRC_CURR_LMP', 'resultformat': 6, 'enddatetime': '20180823T15:44-0000'}}"

    dataStr = '[{"lmp": 26.11882, "timestamp": 1535063100000, "node_id": "SLAP_PGP2-APND", "lmp_type": "LMP", "ba_name": "CAISO", "freq": "5m", "market": "RT5M"}]'

    parsedData = [
      {
        ba_name: "CAISO",
        freq: "5m",
        lmp: 26.11882,
        lmp_type: "LMP",
        market: "RT5M",
        node_id: "SLAP_PGP2-APND",
        timestamp: 1535063100000,
      }
    ]
  })

  test('should be handle a clean response', () => {
    const data = dataStr
    const actual = parseCAISOResponse(data)
    const expected = parsedData
    expect(actual).toEqual(expected)
  })

  test('should be handle a response with a throttle message', () => {
    const data = throttleMessage + dataStr
    const actual = parseCAISOResponse(data)
    const expected = parsedData
    expect(actual).toEqual(expected)
  })
})
