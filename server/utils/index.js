const {
  millisToSeconds,
  tsToMillis,
} = require('./dateTimeUtils')

const { checkStatus } = require('./requestUtils')

const { writeToFile } = require('./fileUtils')

const {
  calculateScoreData,
  calculateDerivedData,
} = require('./dataScienceUtils')

const { findClosest } = require('./geoUtils')

const { setExitListeners } = require('./processUtils')

const {
  findByLatLng,
  createTableRow,
  createTableRows,
  readTableRows,
  updateTableRow,
  deleteTableRows,
  deleteTableRowsWhereNot,
  snakeToCamel,
  camelToSnake,
} = require('./dbUtils/')

module.exports = {
  millisToSeconds,
  tsToMillis,
  checkStatus,
  writeToFile,
  calculateScoreData,
  calculateDerivedData,
  findClosest,
  findByLatLng,
  createTableRow,
  createTableRows,
  readTableRows,
  updateTableRow,
  deleteTableRows,
  deleteTableRowsWhereNot,
  snakeToCamel,
  camelToSnake,
  setExitListeners,
}
