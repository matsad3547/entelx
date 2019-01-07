// const knex = require('../../store/')
const { knex } = require('../index')

// console.log('at read:', knex);

const readTableRows = (table, query) => knex(table)
  .where(query)
  .debug()
  .catch( err => console.error(`Error reading from table ${table} by ${query}:`, err))

module.exports = readTableRows
