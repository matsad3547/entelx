const moment = require('moment-timezone')

const { fiveMinutesMillis } = require('../config/')

const millisToSeconds = millis => Math.round(millis / 1000)

const tsToMillis = (ts, tz) => moment.tz(ts, tz).valueOf()

const getUpdateTimeout = mostRecentTimestamp => {

  const nowMillis = moment().valueOf()

  return fiveMinutesMillis - ((nowMillis - mostRecentTimestamp) % fiveMinutesMillis) + (1000)
}

module.exports = {
  millisToSeconds,
  tsToMillis,
  getUpdateTimeout,
}
