const knex = require('../../store/')

const removeProject = query => knex('project')
  .where(query)
  .del()
  .then( rows => rows > 0 ? {success: true} : {success: false} )

module.exports = removeProject
