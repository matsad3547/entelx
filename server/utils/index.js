const moment = require('moment-timezone')

const convertMillisToSeconds = millis => Math.round(millis / 1000)

module.exports = {
  convertMillisToSeconds,
}
