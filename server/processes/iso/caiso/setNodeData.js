const { createTableRows } = require('../../../db/')
const getNodeLocations = require('./getNodeLocations')

const setNodeData = async () => {

  const nodes = await getNodeLocations()

  await createTableRows('node', nodes)
}

module.exports = setNodeData
