const knex = require('../../store/')

const readProject = (query) => knex('project')
  .where(query)
  .catch( err => console.error(`Error getting project by ${query}: ${err}`))

module.exports = readProject
