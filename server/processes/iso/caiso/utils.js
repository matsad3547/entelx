const moment = require('moment-timezone')

const { utcTZ } = require('../../../config/')

const {
  caisoFormat,
  priceRequests,
  atlasRequests,
} = require('./config')

const {
  parsePriceData,
  parseAtlasData,
} = require('./parsers')

const getDateString = (startMillis, endMillis) => {
  const startDate = moment.tz(startMillis, utcTZ).format(caisoFormat)
  const endDate = moment.tz(endMillis, utcTZ).format(caisoFormat)
  return `&startdatetime=${startDate}&enddatetime=${endDate}`
}

const getVersion = query => {
  switch (query) {
    // case 'ATL_APNODE&APnode_type=ALL':
    case 'ATL_CBNODE':
    case 'PRC_INTVL_LMP':
      return 2

    case 'ENE_WIND_SOLAR_SUMMARY':
      return 5

    default:
      return 1
  }
}

const getUrl = (
  startMillis,
  endMillis,
  query,
  marketType,
  node,
) => {

  const version = getVersion(query)

  const baseUrl =  'http://oasis.caiso.com/oasisapi/SingleZip'
  return `${baseUrl}?queryname=${query}${getDateString(startMillis, endMillis)}&version=${version}${ marketType ? `&market_run_id=${marketType}` : '' }${node ? `&node=${node}` : '' }`
}

const getParser = query => {
  switch (true) {
    case priceRequests.includes(query):
      return parsePriceData

    case atlasRequests.includes(query):
      return parseAtlasData

    default:
      return data => data
  }
}

module.exports = {
  getUrl,
  getParser,
}
