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
          controlArea: node.controlArea,
          // TODO find endpoint to get node max Mw
          // maxMw: node.maxMw,
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

const getNodes = async (req, res) => {
  try {
    const query = req.body.query || {}

    const nodes = await readTableRows('node', query)

    res.status(200).json(processNodes(nodes))
  }
  catch (err) {
    console.error('Error getting nodes:', err)
  }
}

module.exports = getNodes
