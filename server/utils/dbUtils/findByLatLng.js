const knex = require('../../store/')

const findByLatLng = (
  table,
  lat,
  lng,
  addlQuery = {}
) => new Promise( (resolve, reject) => {

  const query = (
    minLat,
    maxLat,
    minLng,
    maxLng,
    comp,
  ) => {

    return knex(table)
      .where(addlQuery)
      .whereBetween('lat', [minLat, maxLat])
      .andWhereBetween('lng', [minLng, maxLng])
      .then( matches => {
        if (matches.length === 0) {
          query(
            minLat - comp,
            maxLat + comp,
            minLng - comp,
            maxLng + comp,
            comp * 2,
          )
          return null
        }
        else {
          resolve(matches)
        }
      })
      .catch(reject)
  }

  let comp = .1
  let minLat = lat - comp
  let maxLat = lat + comp
  let minLng = lng - comp
  let maxLng = lng + comp

  query(minLat, maxLat, minLng, maxLng, comp)
})

module.exports = findByLatLng
