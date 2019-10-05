// Uncomment to log errors as .txt files
// const moment = require('moment')
// const { writeToFile } = require('./fileUtils')

const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  const error = new Error(`HTTP Error: ${res.status} ${res.statusText}`)
  error.status = res.statusText
  error.response = res
  throw error
}

const catchErrorsWithMessage = (msg, fn) => (...args) =>
  fn(...args)
  .catch(err => {
    console.error(`${msg}:`, err)
    throw err
    // Uncomment to log errors as .txt files
    // if (process.env.NODE_ENV === 'development') {
    //   const now = moment()
    //   writeToFile(err.toString(), 'server/errorLog', `error-${now.valueOf()}.txt`)
    // }
  })

const catchErrorAndRestart = (msg, fn) => (...args) => (restartFn) => (...restartArgs) =>
  fn(...args)
    .catch(err => {
      console.error(`${msg}:`, err)
      restartFn(...restartArgs)
    })

module.exports = {
  checkStatus,
  catchErrorsWithMessage,
  catchErrorAndRestart,
}
