const moment = require('moment-timezone')

const {
  fiveMinutesMillis,
  gmtTZ,
  dbDatetimeFormat,
} = require('../config/')

const millisToSeconds = millis => Math.round(millis / 1000)

const tsToMillis = (ts, tz) => moment.tz(ts, tz).valueOf()

const getUpdateTimeout = mostRecentTimestamp => {
  const mostRecentUnix = moment(mostRecentTimestamp).valueOf()

  const nowUnix = moment().valueOf()

  console.log('mostRecentUnix:', mostRecentUnix, 'nowUnix:', nowUnix);

  return getRemainderMillis(mostRecentUnix, nowUnix, fiveMinutesMillis) + 1000
}

const getDBDatetime = isoString => {
  return moment.tz(isoString, gmtTZ).format(dbDatetimeFormat)
}

const getRemainderMillis = (tsUnix, nowUnix, intervalMillis) => {

  return intervalMillis - (Math.abs(nowUnix - tsUnix) % fiveMinutesMillis)
}

module.exports = {
  millisToSeconds,
  tsToMillis,
  getUpdateTimeout,
  getDBDatetime,
  getRemainderMillis,
}
