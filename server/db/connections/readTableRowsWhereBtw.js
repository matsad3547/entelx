const knex = require('../knex')

const readTableRowsWhereBtw = (
  table,
  queryObj,
  wbColumn,
  wbArr,
) => knex(table)
  .where(queryObj)
  .whereBetween(wbColumn, wbArr)
  .catch( err => console.error(`Error reading from "${table}" table by "${queryObj}" and where "${wbColumn}" is between "${wbArr}":`, err))

module.exports = readTableRowsWhereBtw
