const {
  haversineDist,
  degToRad,
} = require('../geoUtils')

describe('haversineDist', () => {

  test('should return correct values', () => {
    const origin = {
      lat: 38.51889,
      lng: -121.44529,
    }
    const destination = {
      lat: 37.99035,
      lng: -121.16057,
    }
    const expected = 63812.91121417192
    const actual = haversineDist(origin, destination)
    expect(actual).toEqual(expected)
  })

  test('should return correct for airports', () => {
    //Salt Lake
    const origin = {
      lat: 40.787778,
      lng: -111.978331,
    }
    //SF
    const destination = {
      lat: 37.622426,
      lng: -122.395751,
    }
    const expected = 963364.9720193548
    const actual = haversineDist(origin, destination)
    expect(actual).toEqual(expected)
  })

})

test('degToRad should return correct values', () => {
  const deg = 90
  const expected = Math.PI / 2
  const actual = degToRad(deg)
  expect(actual).toEqual(expected)
})
