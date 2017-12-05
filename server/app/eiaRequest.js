// const request = require('request-promise')
const Rx = require('rxjs/Rx')
const eiaKey = process.env.EIA_API_KEY
require('es6-promise').polyfill()
require('isomorphic-fetch')

const url = `https://api.eia.gov/series/?api_key=${eiaKey}&series_id=EBA.CAL-ALL.D.H`

const options = {
  method: 'GET',
  uri: url,
  json: true,
}

let eiaRequest = {}

// request(options)
//   .then( res => {
//     console.log('success!');
//     eiaRequest = res
//   })
//   .catch( err => {
//     console.error('There was an error with the request to EIA:', err)
//   })

fetch(url)
  .then( res => {
    if (res.status >= 400) {
        throw new Error("Bad response from server");
    }
    return res.json()
  })
  .then( res => {
    console.log('data:', res.series[0].data)
    eiaRequest.data = res.series[0].data
  })

module.exports = eiaRequest
