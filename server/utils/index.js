const {
  millisToSeconds,
  tsToMillis,
  getUpdateTimeout,
} = require('./dateTimeUtils')

const { checkStatus } = require('./requestUtils')

const { writeToFile } = require('./fileUtils')

const {
  calculateScoreData,
  calculateDerivedData,
} = require('./dataScienceUtils')

const { findClosest } = require('./geoUtils')

const { setExitListeners } = require('./processUtils')

module.exports = {
  millisToSeconds,
  tsToMillis,
  getUpdateTimeout,
  checkStatus,
  writeToFile,
  calculateScoreData,
  calculateDerivedData,
  findClosest,
  setExitListeners,
}
