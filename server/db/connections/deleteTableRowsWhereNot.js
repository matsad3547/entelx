const knex = require('../knex')

const deleteTableRowsWhereNot = (table, identifier) => knex(table)
  .whereNot(identifier)
  .del()
  .then( rows => rows > 0 ? {success: true} : {success: false} )
  .catch( err => console.error(`There was an error deleting the "${table}" rows by "${identifier}": ${err}`) )

module.exports = deleteTableRowsWhereNot
