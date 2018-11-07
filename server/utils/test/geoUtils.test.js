const {
  haversineDist,
  degToRad,
  findClosestId,
} = require('../geoUtils')

const selectedNodes = [
  {
    name: 'DESRT PK_GNODEIT',
    type: 'GEN',
    control_area: 'NV',
    lat: 39.75,
    lng: -118.95,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 1473,
    score: 0
  },
  {
    name: 'EAGLE_LNODE01',
    type: 'LOAD',
    control_area: 'NV',
    lat: 39.62,
    lng: -119.21,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 1702,
    score: 0
  },
  {
    name: 'EAGLE_LNODE02',
    type: 'LOAD',
    control_area: 'NV',
    lat: 39.62,
    lng: -119.21,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 1703,
    score: 0
  },
  {
    name: 'EAGLE_LNODE18',
    type: 'LOAD',
    control_area: 'NV',
    lat: 39.62,
    lng: -119.21,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 1704,
    score: 0
  },
  {
    name: 'NDL-BUSH_LNODE-1',
    type: 'LOAD',
    control_area: 'NV',
    lat: 39.62,
    lng: -119.21,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 3936,
    score: 0
  },
  {
    name: 'NDL-EGL_LNODE-1',
    type: 'LOAD',
    control_area: 'NV',
    lat: 39.62,
    lng: -119.21,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 3937,
    score: 0
  },
  {
    name: 'NDL-EGL_LNODE-2',
    type: 'LOAD',
    control_area: 'NV',
    lat: 39.62,
    lng: -119.21,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 3938,
    score: 0
  },
  {
    name: 'NGHTGALE_GNODEIT',
    type: 'GEN',
    control_area: 'NV',
    lat: 39.8,
    lng: -119.01,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 3973,
    score: 0
  },
  {
    name: 'NGHTGALE_LNODE18',
    type: 'LOAD',
    control_area: 'NV',
    lat: 39.8,
    lng: -119.01,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 3975,
    score: 0
  },
  {
    name: 'NVCEMNT_LNODEC1',
    type: 'LOAD',
    control_area: 'NV',
    lat: 39.62,
    lng: -119.26,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 4053,
    score: 0
  },
  {
    name: 'NVCEMNT_LNODEC2',
    type: 'LOAD',
    control_area: 'NV',
    lat: 39.62,
    lng: -119.26,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 4055,
    score: 0
  },
  {
    name: 'PATUA_GNODEIT',
    type: 'GEN',
    control_area: 'NV',
    lat: 39.62,
    lng: -119.21,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 4301,
    score: 0
  },
  {
    name: 'US GEO_GNODET',
    type: 'GEN',
    control_area: 'NV',
    lat: 40.35,
    lng: -119.34,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 5953,
    score: 0
  },
  {
    name: 'WADSWRTH_LNODETH',
    type: 'LOAD',
    control_area: 'NV',
    lat: 39.65,
    lng: -119.33,
    start_date: null,
    end_date: null,
    max_mw: null,
    id: 6078,
    score: 0
  },
]

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

describe('findClosestId', () => {
  test('should return a number', () => {
    const lat = 40.0
    const lng = -119.0
    const actual = findClosestId(lat, lng, selectedNodes)
    const expected = 3973
    expect(actual).toEqual(expected)
  })
})
