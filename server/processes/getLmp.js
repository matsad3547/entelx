const spawn = require('child_process').spawn

const getLmp = (startDate, endDate) => new Promise((resolve, reject) => {
  const py = spawn('python', ['server/processes/python/get_lmp.py'])

  let dataArr = []

  console.time('lmp data');

  py.stdout.on('data', data => dataArr = [...dataArr, data.toString('utf8')] )

  py.stderr.on('data', err => reject(err.toString('utf8')))

  py.stdout.on('end', () => {
    console.timeEnd('lmp data');
    resolve(dataArr)
  })

  py.stdin.write(JSON.stringify({startDate, endDate}))

  py.stdin.end()
})

module.exports = getLmp
