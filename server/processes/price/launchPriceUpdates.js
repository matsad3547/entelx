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
  })
}

module.exports = launchPriceUpdates
