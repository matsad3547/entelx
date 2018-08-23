// demo python process

const spawn = require('child_process').spawn

const demoProcess = input => new Promise((resolve, reject) => {
  const py = spawn('python', ['server/processes/python/demo_process.py'])

  let dataString = ''

  py.stdout.on('data', data => dataString += data.toString('utf8'))

  py.stdout.on('end', () => resolve(dataString) )

  py.stdin.write(JSON.stringify(input))

  py.stdin.end()
})

module.exports = demoProcess
