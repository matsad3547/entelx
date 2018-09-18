const convertMillisToSeconds = millis => Math.round(millis / 1000)

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
  convertMillisToSeconds,
  checkStatus,
}
