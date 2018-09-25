const moment = require('moment-timezone')

const {
  caisoTZ,
  caisoFormat,
} = require('./config')

const tsToMillis = ts => moment.tz(ts, caisoTZ).valueOf()

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

module.exports = {
  tsToMillis,
  getUrl,
}
