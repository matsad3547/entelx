const moment = require('moment-timezone')

const millisToSeconds = millis => Math.round(millis / 1000)

const tsToMillis = (ts, tz) => moment.tz(ts, tz).valueOf()

module.exports = {
  millisToSeconds,
  tsToMillis,
}
