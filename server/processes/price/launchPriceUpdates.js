const { spawn } = require('child_process')

const launchPriceUpdates = params => {

  const { node } = params

  // TODO Get the latest time stamp from the price table with the same nodeId

  console.log('node at launchPriceUpdates:', node);

  const args = JSON.stringify({
    ...params,
    // mostRecent: someNumber
  })

  const updateData = spawn('node', ['server/processes/price/updatePresentPriceData.js', args], {
    stdio: 'inherit',
    detached: true,
  })

  updateData.on('error', err => {
    console.error('There was an error running the `updatePriceData` process:', err)
    updateData.exit(1)
    throw new Error(err)
  })

  updateData.unref()
}

module.exports = launchPriceUpdates
