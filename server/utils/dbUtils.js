const knex = require('../store/')

const findByLatLng = (
  lat,
  lng,
  table,
) => {

  let matches = []

  const query = (
    minLat,
    maxLat,
    minLng,
    maxLng,
    comp,
  ) => {

    knex(table)
      .whereBetween('lat', [minLat, maxLat])
      .andWhereBetween('lng', [minLng, maxLng])
      .then( val => {
        // console.log('val?', val, 'comp:', comp)
        matches = val
        if (matches.length === 0) {
          return query(
            minLat - comp,
            maxLat + comp,
            minLng - comp,
            maxLng + comp,
            comp * 2,
          )
        }
        else {
          return matches
        }
      })
      .then( val => console.log('am I returning anything?', val))
      .catch( err => console.error(`Error getting a result from ${table} by lat lng: ${err}`))
  }

  let comp = .1
  let minLat = lat - comp
  let maxLat = lat + comp
  let minLng = lng - comp
  let maxLng = lng + comp

  query(minLat, maxLat, minLng, maxLng, comp)
}

module.exports = {
  findByLatLng,
}
