const db = require('../../store/')

const deleteProject = query => db('project')
  .where(query)
  .del()
  .then( rows => rows > 0 ? {success: true} : {success: false} )
  .catch( err => console.error(`There was an error deleting your project: ${err}`) )

module.exports = deleteProject
