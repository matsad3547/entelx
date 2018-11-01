const knex = require('../../store/')

const getNodes = (req, res) => knex('node')
  .then( nodes => res.json(nodes) )
  // .debug()
  .catch( err => console.error(`Error getting nodes: ${err}`))

module.exports = getNodes
