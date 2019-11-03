const { spawn } = require('child_process')

const launchPriceUpdates = params => {

  const args = JSON.stringify(params)

  // const updatePresentData = spawn('node', ['server/processes/price/updatePresentPriceData.js', args], {
  //   stdio: 'inherit',
  //   detached: true,
  // })

  const updatePastData = spawn('node', ['server/processes/price/updatePastPriceData.js', args], {
    stdio: 'inherit',
    detached: true,
  })

  // updatePresentData.on('error', err => {
  //   console.error('There was an error running the "updatePresentPriceData" process:', err)
  // })

  updatePastData.on('error', err => {
    console.error('There was an error running the "updatePastPriceData" process:', err)
  })

  // updatePresentData.unref()
  updatePastData.unref()
}

module.exports = launchPriceUpdates
