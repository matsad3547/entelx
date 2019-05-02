const knex = require('../knex')

const findMin = (
  table,
  minColumn,
  addlQuery = {},
) => knex(table)
  .where(addlQuery)
  .min(minColumn)
  .catch( err => console.error(`Error finding the max value for column ${minColumn} where ${addlQuery} from table ${table}:`, err))

module.exports = findMin
