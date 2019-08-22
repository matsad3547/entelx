const knex = require('../knex')

const findMax = (
  table,
  maxColumn,
  addlQuery = {},
) => knex(table)
  .where(addlQuery)
  .max(maxColumn)
  .catch( err => console.error(`Error finding the max value for column "${maxColumn}" where "${addlQuery}" from table "${table}":`, err))

module.exports = findMax
