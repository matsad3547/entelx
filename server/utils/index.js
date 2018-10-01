const moment = require('moment-timezone')

const millisToSeconds = millis => Math.round(millis / 1000)

const tsToMillis = (ts, tz) => moment.tz(ts, tz).valueOf()

const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  const error = new Error(`HTTP Error: ${res.status} ${res.statusText}`)
  error.status = res.statusText;
  error.response = res
  throw error
}

module.exports = {
  millisToSeconds,
  checkStatus,
  tsToMillis,
}
