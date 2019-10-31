const moment = require('moment-timezone')

const {
  fiveMinutesMillis,
  utcTZ,
} = require('../config/')

const millisToSeconds = millis => Math.round(millis / 1000)

const tsToMillis = (ts, tz) => moment.tz(ts, tz).valueOf()

const getUpdateTimeout = mostRecentTimestamp => {

  const nowMillis = moment().valueOf()

  return fiveMinutesMillis - ((nowMillis - mostRecentTimestamp) % fiveMinutesMillis) + (1000)
}

const getDBDatetime = isoString => {
  return moment.tz(isoString, utcTZ).format('YYYY-MM-DD HH:mm:ss.SSS')
}

module.exports = {
  millisToSeconds,
  tsToMillis,
  getUpdateTimeout,
  getDBDatetime,
}
