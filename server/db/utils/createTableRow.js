// const knex = require('../../store/')
const { knex } = require('../index')

const createTableRow = (table, data) => knex(table)
  .insert(data)
  .debug()
  .returning('id')
  .catch( err => console.error(`There was an error creating a new row for table ${table}: ${err}`))

module.exports = createTableRow
