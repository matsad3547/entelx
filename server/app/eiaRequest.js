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

const eiaRequest = {}


// const req = Rx.Observable.fromEvent(
//   app.get('/api')
// )
// .flatMap( n =>
//   Rx.Observable.fromPromise(
//     fetch(url)
//   )
//   .catch( res => {
//     console.error('Something went wrong:', res.statusText)
//     return Rx.Observable.empty()
//   })
// )
// .subscribe( res => console.log(res) )



fetch(url)
  .then( res => {
    if (res.status >= 400) {
        throw new Error("Bad response from server");
    }
    else {
      return res.json()
    }
  })
  .then( res => {
    if (res.data && res.data.error) {
      console.error('There was an error getting eia data:', res.data.error)
      eiaRequest.error = res.data.error
      eiaRequest.data = null
    }
    else {
      eiaRequest.data = res.series[0].data
    }
  })
  .catch( err => console.error('There was an error in the eiaModule:', err) )

  

module.exports = eiaRequest
