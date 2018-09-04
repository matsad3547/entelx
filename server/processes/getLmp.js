const spawn = require('child_process').spawn
const { utcFormat } = require('../config/')

// TODO this is a super lame way of parsing the response
const parseCAISOResponse = dataStr => {
  const hasThrottleMessage = dataStr.includes('CAISO: retrying in 5 seconds')

  const goodStr = hasThrottleMessage ? dataStr.split('}}')[1] : dataStr

  return JSON.parse(goodStr)
}

const getLmp = (start, end) => new Promise((resolve, reject) => {

  const startDate = start.format(utcFormat)
  const endDate = end.format(utcFormat)

  const py = spawn('python', ['server/processes/python/get_lmp.py'])

  console.time('lmp data')
  let dataStr = ''

  py.stdout.on('data', data => dataStr += data.toString('utf8'))

  py.stderr.on('data', err => reject(err.toString('utf8')))

  py.stdout.on('end', () => {
    console.timeEnd('lmp data')
    // console.log('data at getLmp:', dataStr )

    const parsedData = parseCAISOResponse(dataStr)
    resolve(parsedData)
  })

  py.stdin.write(JSON.stringify({
      startDate,
      endDate,
    })
  )

  py.stdin.end()
})

module.exports = {
  getLmp,
  parseCAISOResponse,
}
