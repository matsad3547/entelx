const knex = require('../knex')

const updateTableRow = (table, identifier, data) => knex(table)
  .where(identifier)
  .update(data)
  .catch( err => console.error(`There was an error updating the ${table} table by`, identifier,':', err) )

module.exports = updateTableRow
