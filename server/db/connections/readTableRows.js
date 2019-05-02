const knex = require('../knex')

const readTableRows = (table, query) => knex(table)
  .where(query)
  .catch( err => console.error(`Error reading from table ${table} by ${query}:`, err))

module.exports = readTableRows
