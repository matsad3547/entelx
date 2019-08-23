const { createTableRows } = require('../../../db/')
const getNodeLocations = require('./getNodeLocations')

// to run from the console:
// 1. Go to `server/processes/iso/caiso`
// 2. Run `$ node -e 'require("./setNodeData")()'`

const setNodeData = async () => {

  const nodes = await getNodeLocations()

  console.log('nodes:', nodes);

  await createTableRows('node', nodes)
}

module.exports = setNodeData
