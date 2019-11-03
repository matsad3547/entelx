const moment = require('moment-timezone')

const {
  fiveMinutesMillis,
  gtmTZ,
  dbDatetimeFormat,
} = require('../config/')

const millisToSeconds = millis => Math.round(millis / 1000)

const tsToMillis = (ts, tz) => moment.tz(ts, tz).valueOf()

const getUpdateTimeout = mostRecentTimestamp => {
  const mostRecentUnix = moment(mostRecentTimestamp).valueOf()

  const nowMillis = moment().valueOf()

  return fiveMinutesMillis - ((nowMillis - mostRecentUnix) % fiveMinutesMillis) + (1000)
}

const getDBDatetime = isoString => {
  return moment.tz(isoString, gtmTZ).format(dbDatetimeFormat)
}

module.exports = {
  millisToSeconds,
  tsToMillis,
  getUpdateTimeout,
  getDBDatetime,
}
