const { spawn } = require('child_process')

const args = JSON.stringify({node: 'WORDS_THINGS'})

const child = spawn('node', ['processes/price/updatePriceData.js', args], {
  stdio: 'inherit',
  env: process.env,
})

child.on('error', err => console.error('there was an error:', err) )

child.unref();
console.log('things are happening');
