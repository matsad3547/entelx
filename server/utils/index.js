const {
  millisToSeconds,
  tsToMillis,
  getUpdateTimeout,
} = require('./dateTimeUtils')

const {
  checkStatus,
  catchErrorsWithMessage,
} = require('./requestUtils')

const { writeToFile } = require('./fileUtils')

const {
  calculateScoreData,
  calculateDerivedData,
} = require('./calculationUtils')

const { findClosest } = require('./geoUtils')

const { setExitListeners } = require('./processUtils')

module.exports = {
  millisToSeconds,
  tsToMillis,
  getUpdateTimeout,
  checkStatus,
  catchErrorsWithMessage,
  writeToFile,
  calculateScoreData,
  calculateDerivedData,
  findClosest,
  setExitListeners,
}
