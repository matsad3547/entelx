const getLmp = require('./getLmp').getLmp
const demoProcess = require('./demoProcess')

const today = Date.now()

const endDate = new Date(today).toISOString()

const startDate = new Date(today - 24 * 60 * 60 * 1000).toISOString()

let lmp = {}

// getLmp(startDate, endDate)
//   .then( res => {
//     // console.log('response: ', res)
//     lmp.data = res
//   })
//   .catch( err => console.error('Error getting lmp data:', err) )

// demoProcess([1, 2, 3])
//   .then( res => {
//     console.log('demo data:', res);
//   })
//   .catch( err => console.error('Error getting demo data:', err) )

module.exports = {
  lmp,
  demoProcess,
}
