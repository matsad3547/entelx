const knex = require('../knex')

const createTableRows = (table, dataArr) => knex(table)
  .insert(dataArr)
  .catch( err => console.error(`There was an error creating new rows for table "${table}": ${err}`))

module.exports = createTableRows
