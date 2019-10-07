const {
  millisToSeconds,
  tsToMillis,
  getUpdateTimeout,
} = require('./dateTimeUtils')

const {
  checkStatus,
  catchErrorsWithMessage,
  catchErrorAndRestart,
  handleMultiPromiseError,
} = require('./requestUtils')

const { writeToFile } = require('./fileUtils')

const {
  calculateDerivedData,
  calculateScoreData,
  findRevenueAndCharge,
  getCenteredValuesArr,
  getTwoDimensionalArray,
} = require('./calculationUtils')

const { findClosest } = require('./geoUtils')

const {
  setExitListeners,
  getMaxTimeStamp,
  getMinTimeStamp,
} = require('./processUtils')

module.exports = {
  millisToSeconds,
  tsToMillis,
  getUpdateTimeout,
  checkStatus,
  catchErrorsWithMessage,
  catchErrorAndRestart,
  handleMultiPromiseError,
  writeToFile,
  calculateDerivedData,
  calculateScoreData,
  findRevenueAndCharge,
  findClosest,
  setExitListeners,
  getMaxTimeStamp,
  getMinTimeStamp,
  getCenteredValuesArr,
  getTwoDimensionalArray,
}
