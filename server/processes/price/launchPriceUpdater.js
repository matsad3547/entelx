const { spawn } = require('child_process')

const launchPriceUpdater = (params) => {

  const args = JSON.stringify(params)

  const updateData = spawn('node', ['server/processes/price/updatePriceData.js', args], {
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

module.exports = launchPriceUpdater
