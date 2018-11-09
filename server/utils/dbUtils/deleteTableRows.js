const db = require('../../store/')

const deleteTableRows = (table, identifier) => db(table)
  .where(identifier)
  .del()
  .then( rows => rows > 0 ? {success: true} : {success: false} )
  .catch( err => console.error(`There was an error deleting the ${table} rows by ${identifier}: ${err}`) )

module.exports = deleteTableRows
