const getLmp = require('./getLmp')
const demoProcess = require('./demoProcess')

const today = Date.now()

const endDate = new Date(today).toString()

const startDate = new Date(today - 24 * 60 * 60 * 1000).toString()

let lmp = {}

getLmp(startDate, endDate)
  .then( res => {
    console.log('res:', res);
    lmp.data = res
  })
  .catch( err => console.error('Error getting lmp data:', err) )

demoProcess({startDate, endDate})
  .then( res => {
    console.log('demo data:', res);
  })
  .catch( err => console.error('Error getting demo data:', err) )

module.exports = {
  lmp,
  demoProcess,
}
