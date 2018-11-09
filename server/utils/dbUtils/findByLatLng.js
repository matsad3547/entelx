const db = require('../../store/')

const findByLatLng = (
  table,
  lat,
  lng,
) => new Promise( (resolve, reject) => {
  console.time('findByLatLng')

  const query = (
    minLat,
    maxLat,
    minLng,
    maxLng,
    comp,
  ) => {

    db(table)
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
        console.timeEnd('findByLatLng')
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
