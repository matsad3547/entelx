const earthRad = 6371 * 10**3 //meters

const degToRad = deg => (deg * Math.PI)/180

const haversineDist = (o, d) => {
  const lat1 = degToRad(o.lat)
  const lng1 = degToRad(o.lng)
  const lat2 = degToRad(d.lat)
  const lng2 = degToRad(d.lng)

  return earthRad * 2 * Math.asin(
    Math.sqrt(
      Math.sin((lat1 - lat2)/2)**2 + (Math.cos(lat1) * Math.cos(lat2) * Math.sin((lng1 - lng2)/2)**2)))
}

// items in search array `arr` must have `lat`, `lng`, and `id` properties for this function to work correctly
const findClosest = (lat, lng, arr) => {

  const closest = arr.reduce( (acc, item) => {
    const d = haversineDist(
      {
        lat,
        lng
      },
      {
        lat: item.lat,
        lng:item.lng
      },
    )
    return d < acc.d ? {d, val: item} : acc

  }, {
      d: Infinity,
      val: {},
    }
  )
  return closest.val
}

module.exports = {
  haversineDist,
  degToRad,
  findClosest,
}
