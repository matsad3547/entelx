const spawn = require('child_process').spawn
const py = spawn('python', ['server/processes/python/get_lmp.py'])


const getLmp = (startDate, endDate) => new Promise((resolve, reject) => {

  let dataArr = []

  py.stdin.write(JSON.stringify({startDate, endDate}))

  py.stdout.on('data', data => dataArr = [...dataArr, data.toString('utf8')] )

  py.stdout.on('end', () => resolve(dataArr))

  py.stdin.end()
})

module.exports = getLmp
