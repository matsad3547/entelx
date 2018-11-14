const { readTableRows } = require('../utils/')

const getNodes = (req, res) => {
  const query = req.body.query || {}
  readTableRows('node', query)
  .then( nodes => res.json(nodes) )
  .catch( err => console.error(`Error getting nodes: ${err}`))
}

module.exports = getNodes
