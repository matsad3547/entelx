const spawn = require('child_process').spawn
const py = spawn('python', ['server/processes/get_lmp.py'])

const today = Date.now()

const end = new Date(today).toString()

const start = new Date(today - 24 * 60 * 60 * 1000).toString()

// console.log('end:', end, '\nstart:', start);

let dataArr = []

py.stdout.on('data', data => dataArr = [...dataArr, data.toString('utf8')] )

py.stdout.on('end', () => console.log(`Locational marginal prices from CAISO: ${dataArr}`) )

py.stdin.write(JSON.stringify({start, end}))

py.stdin.end()

return dataArr
