const knex = require('../knex')

const createTableRow = (table, data) => knex(table)
  .insert(data)
  .returning('id')
  .catch( err => console.error(`There was an error creating a new row for table "${table}": ${err}`))

module.exports = createTableRow
