const { createTableRows } = require('../../../db/')
const getNodeLocations = require('./getNodeLocations')

// to run from the console:
// 1. Go to `server/processes/iso/caiso`
// 2. Run `$ node -e 'require("./setNodeData")()'`

// TODO this cannot be run from the console, probably because the node env is wrong - figure out how to set it

const setNodeData = async () => {

  const nodes = await getNodeLocations()

  console.log('nodes:', nodes);

  await createTableRows('node', nodes)
}

module.exports = setNodeData
