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

const getNodes = async (req, res) => {
  console.log('getting nodes?');
  try {

    const query = req.body.query || {}

    const nodes = await readTableRows('node', query)

    console.log('nodes:', nodes && nodes.length)

    res.json(processNodes(nodes))
  }
  catch (err) {
    console.error('Error getting nodes:', err)
  }
}

module.exports = getNodes
