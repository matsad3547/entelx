const knex = require('../../store/')

const deleteProject = query => knex('project')
  .where(query)
  .del()
  .then( rows => rows > 0 ? {success: true} : {success: false} )

module.exports = deleteProject
