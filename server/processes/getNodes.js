const { readTableRows } = require('../utils/')

const getNodes = (req, res) => readTableRows('node', {})
  .then( nodes => res.json(nodes) )
  .catch( err => console.error(`Error getting nodes: ${err}`))

module.exports = getNodes
