const knex = require('../../store/')

const getProject = (req, res) => knex('project')
  .then( nodes => res.json(nodes) )
  .catch( err => console.error(`Error getting nodes: ${err}`))

module.exports = getProject
