const db = require('../../store/')

const readProject = (query) => db('project')
  .where(query)
  .debug()
  .catch( err => console.error(`Error getting project by ${query}: ${err}`))

module.exports = readProject
