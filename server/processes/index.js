const spawn = require('child_process').spawn
const py = spawn('python', ['server/processes/compute_input.py'])

const dataArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let dataString = ''

py.stdout.on('data', data => dataString += data.toString('utf8'))

py.stdout.on('end', () => console.log(`Sum of numbers: ${dataString}`) )

py.stdin.write(JSON.stringify(dataArr))

py.stdin.end()
