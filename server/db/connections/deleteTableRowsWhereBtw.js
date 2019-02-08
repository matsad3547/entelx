const knex = require('../knex')

const deleteTableRowsWhereBtw = (
  table,
  queryObj,
  wbColumn,
  wbArr,
) => knex(table)
  .where(queryObj)
  .whereBetween(wbColumn, wbArr)
  .del()
  .then( rows => rows > 0 ? {success: true} : {success: false} )
  .catch( err => console.error(`Error deleting from '${table}' table where '${wbColumn}' is between ${wbArr}:`, err))

module.exports = deleteTableRowsWhereBtw
