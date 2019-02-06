const {
  millisToSeconds,
  tsToMillis,
  getUpdateTimeout,
} = require('./dateTimeUtils')

const {
  checkStatus,
  catchErrorsWithMessage,
  catchErrorAndRestart,
} = require('./requestUtils')

const { writeToFile } = require('./fileUtils')

const {
  calculateScoreData,
  calculateDerivedData,
  findRevenueAndCharge,
} = require('./calculationUtils')

const { findClosest } = require('./geoUtils')

const { setExitListeners } = require('./processUtils')

module.exports = {
  millisToSeconds,
  tsToMillis,
  getUpdateTimeout,
  checkStatus,
  catchErrorsWithMessage,
  catchErrorAndRestart,
  writeToFile,
  calculateScoreData,
  calculateDerivedData,
  findRevenueAndCharge,
  findClosest,
  setExitListeners,
}
