const { readTableRows } = require('../db/')

const processNodes = nodes => nodes.reduce( (obj, node) => ({
    ...obj,
    features: [
      ...obj.features,
      {
        type: 'Feature',
        properties: {
          type: node.type,
          name: node.name,
          maxMw: node.maxMw,
          controlArea: node.controlArea,
        },
        geometry: {
          type: 'Point',
          coordinates: [node.lng, node.lat],
        },
        id: node.id,
      },
    ],
  }), {
    type: 'FeatureCollection',
    features: [],
})

const getNodes = (req, res) => {
  const query = req.body.query || {}
  return readTableRows('node', query)
    .then( nodes => res.json(processNodes(nodes)) )
    .catch( err => {
      console.error('Error getting nodes:', err)
    })
}

module.exports = getNodes
