const convertMillisToSeconds = millis => Math.round(millis / 1000)

const convertSecondsToMillis = seconds => seconds * 1000

module.exports = {
  convertMillisToSeconds,
  convertSecondsToMillis,
}
