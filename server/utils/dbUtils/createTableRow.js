const db = require('../../store/')

const createTableRow = (table, data) => db(table)
  .insert(data)
  .debug()
  .returning('id')
  .catch( err => console.error(`There was an error creating a new row for table ${table}: ${err}`))

module.exports = createTableRow
