const { spawn } = require('child_process')
const moment = require('moment')

const updateThresholds = () => {

  console.log('Starting thresholds update...');

  const now = moment()
  const end = now.toISOString()
  const start = now.clone()
    .subtract(5, 'days')
    .toISOString()

  const args = JSON.stringify({start, end})

  const updateThresholds = spawn('node', ['server/processes/threshold/updateAllProjectThresholds.js', args], {
    stdio: 'inherit',
    detached: true,
  })

  updateThresholds.on('error', err => {
    console.error('There was an error updating thresholds:', err)
  })

  updateThresholds.unref()
}

module.exports = updateThresholds
