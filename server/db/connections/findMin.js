const knex = require('../knex')

const findMin = (
  table,
  minColumn,
  addlQuery = {},
) => knex(table)
  .where(addlQuery)
  .min(minColumn)
  .debug()
  .catch( err => console.error(`Error finding the max value for column ${maxColumn} where ${addlQuery} from table ${table}:`, err))

module.exports = findMin
