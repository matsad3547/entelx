const { spawn } = require('child_process')

const { findMax } = require('../../db/')

const launchPriceUpdates = params => {

  const { node } = params

  const nodeId = node.id

  return findMax(
    'price',
    'timestamp',
    {nodeId,}
  )
  .then( maxRes => {
    const mostRecent = maxRes[0]['max(timestamp)']

    const args = JSON.stringify({
      ...params,
      mostRecent,
    })

    const updatePresentData = spawn('node', ['server/processes/price/updatePresentPriceData.js', args], {
      stdio: 'inherit',
      detached: true,
    })

    const updatePastData = spawn('node', ['server/processes/price/updatePastPriceData.js', args], {
      stdio: 'inherit',
      detached: true,
    })

    updatePresentData.on('error', err => {
      console.error('There was an error running the "updatePriceData" process:', err)
      updatePresentData.exit(1)
      throw new Error(err)
    })

    updatePastData.on('error', err => {
      console.error('There was an error running the "updatePastData" process:', err)
      updatePastData.exit(1)
      throw new Error(err)
    })

    updatePresentData.unref()
    updatePastData.unref()
  })
}

module.exports = launchPriceUpdates
