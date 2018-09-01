const convertMillisToSeconds = millis => Math.round(millis / (60 * 1000))

const convertSecondsToMillis = seconds => seconds * 60 * 1000

module.exports = {
  convertMillisToSeconds,
  convertSecondsToMillis,
}
