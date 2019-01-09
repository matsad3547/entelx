const { readTableRows } = require('../db/')

const getNodes = (req, res) => {
  const query = req.body.query || {}
  return readTableRows('node', query)
    .then( nodes => res.json(nodes) )
    .catch( err => {
      console.error('Error getting nodes:', err)
      next(err)
    })
}

module.exports = getNodes
