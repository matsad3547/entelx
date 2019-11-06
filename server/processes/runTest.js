const { catchErrorsWithMessage } = require('../utils/')

const { findMax } = require('../db/')

const runTest = async (req, res) => {

  const {
    nodeId
  } = req.params

  const max = await catchErrorsWithMessage(`There was an error finding the max timestamp associated with node ${nodeId}`, findMax)('price', 'timestamp', {nodeId,})

  const mostRecent = max[0]['max(timestamp)']

  console.log('running test!', mostRecent);

  return res.status(200).json({
    success: true,
    mostRecent,
    type: typeof mostRecent,
  })
}

module.exports = runTest
