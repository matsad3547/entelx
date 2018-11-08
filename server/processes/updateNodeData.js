const { modifyNode } = require('./dbConnections/')

const { getNodeLocations } = require('./iso/caiso/')

const updateNodeData = (req, res) => {

  const keys = req.body.keys

  const request = getNodeLocations

  request()
    .then( data => {
      data.forEach( d => {
        const dataPackage = ['name', ...keys].reduce( (obj, k) => ({
          ...obj,
          [k]: d[k],
        }), {})
        modifyNode(dataPackage)
      })
      res.sendStatus(200)
    })
    .catch( err => {
      console.error(`There was an error at updateNodeData: ${err}`)
      res.status(500).json({err,})
    })
}

module.exports = updateNodeData
