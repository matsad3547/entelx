const findByLatLng = require('./findByLatLng')
const findMax = require('./findMax')
const findMin = require('./findMin')
const createTableRow = require('./createTableRow')
const createTableRows = require('./createTableRows')
const readTableRows = require('./readTableRows')
const readTableRowsWhereBtw = require('./readTableRowsWhereBtw')
const updateTableRow = require('./updateTableRow')
const deleteTableRows = require('./deleteTableRows')
const deleteTableRowsWhereNot = require('./deleteTableRowsWhereNot')

module.exports = {
  findByLatLng,
  findMax,
  findMin,
  createTableRow,
  createTableRows,
  readTableRows,
  readTableRowsWhereBtw,
  updateTableRow,
  deleteTableRows,
  deleteTableRowsWhereNot,
}
