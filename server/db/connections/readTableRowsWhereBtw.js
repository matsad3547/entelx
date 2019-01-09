const knex = require('../knex')

const readTableRowsWhereBtw = (
  table,
  queryObj,
  wbColumn,
  wbArr,
) => knex(table)
  .where(queryObj)
  .whereBetween(wbColumn, wbArr)
  .debug()
  .catch( err => console.error(`Error reading from table ${table} by ${query} and where ${wbColumn} is between ${wbArr}:`, err))

module.exports = readTableRowsWhereBtw
