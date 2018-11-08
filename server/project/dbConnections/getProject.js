const knex = require('../../store/')

const getProject = (query) => knex('project')
  .where(query)
  .catch( err => console.error(`Error getting project by ${query}: ${err}`))

module.exports = getProject
