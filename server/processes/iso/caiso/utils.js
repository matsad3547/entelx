const moment = require('moment-timezone')

const {
  caisoTZ,
  caisoFormat,
  priceRequests,
  atlasRequests,
} = require('./config')

const {
  parsePriceData,
  parseAtlasData,
} = require('./parsers')

const getDateString = (startMillis, endMillis) => {
  const startDate = moment.tz(startMillis, caisoTZ).format(caisoFormat)
  const endDate = moment.tz(endMillis, caisoTZ).format(caisoFormat)
  return `&startdatetime=${startDate}&enddatetime=${endDate}`
}

const getUrl = (
  startMillis,
  endMillis,
  queryName,
  marketType,
  node,
) => {

  const baseUrl =  'http://oasis.caiso.com/oasisapi/SingleZip'
  return `${baseUrl}?queryname=${queryName}${getDateString(startMillis, endMillis)}&version=1${ marketType ? `&market_run_id=${marketType}` : '' }${node ? `&node=${node}` : '' }`
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
