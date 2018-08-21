const getLmp = require('./getLmp')

const today = Date.now()

const endDate = new Date(today).toString()

const startDate = new Date(today - 24 * 60 * 60 * 1000).toString()

let lmp = {}

getLmp(startDate, endDate)
  .then( res => {
    lmp.data = res
  })
  .catch( err => console.error('something happened:', err) )

module.exports = {
  lmp,
}

//demo python process

// const spawn = require('child_process').spawn
// const py = spawn('python', ['server/processes/demo_process.py'])

// const dataArr = [2, 2, 3, 4, 5, 6, 7, 8, 9]
// let dataString = ''
//
// py.stdout.on('data', data => dataString += data.toString('utf8'))
//
// py.stdout.on('end', () => console.log(`Sum of numbers: ${dataString}`) )
//
// py.stdin.write(JSON.stringify(dataArr))
//
// py.stdin.end()
