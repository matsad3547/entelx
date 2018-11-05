const knex = require('../../store/')

const removeProject = query => knex('project')
  .where(query)
  .del()
  .then( rows => rows > 0 ? {success: true} : {success: false} )

  // .exec( val => console.log('val at remove:', val) )

module.exports = removeProject
