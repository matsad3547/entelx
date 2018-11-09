const db = require('../../store/')

const readTableRows = (table, query) => db(table)
  .where(query)
  .debug()
  .catch( err => console.error(`Error reading from table ${table} by ${query}: ${err}`))

module.exports = readTableRows
