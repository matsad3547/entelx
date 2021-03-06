// const Rx = require('rxjs/Rx')
const eiaKey = process.env.EIA_API_KEY

const url = `https://api.eia.gov/series/?api_key=${eiaKey}&series_id=EBA.CAL-ALL.D.H`

const options = {
  method: 'GET',
  uri: url,
  json: true,
}

let eia = {}


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
      eia.error = res.data.error
      eia.data = null
    }
    else {
      eia.data = res.series[0].data
    }
  })
  .catch( err => console.error('There was an error in the eiaModule:', err) )

module.exports = eia
