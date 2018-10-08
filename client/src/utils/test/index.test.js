import { findRelevantKeys } from '../index'

test('findRelevantKeys', () => {
  const data = [
    {
      congestionPrc: 0,
      energyPrc: 27.72074,
      ghgPrc: 0,
      lmp: 27.64035,
      lossPrc: -0.08039,
      timestamp: 1538880900000,
    },
    {
      cloudCover: 0.27,
      congestionPrc: 0,
      energyPrc: 29.66288,
      ghgPrc: 0,
      lmp: 29.4849,
      lossPrc: -0.17798,
      temperature: 69.84,
      timestamp: 1538881200000,
      windBearing: 17,
      windSpeed: 6.49,
    },
    {
      congestionPrc: 0,
      energyPrc: 37.38078,
      ghgPrc: 0,
      lmp: 37.15649,
      lossPrc: -0.22428,
      timestamp: 1538881500000,
    },
  ]
  const expected = [
    'congestionPrc',
    'energyPrc',
    'ghgPrc',
    'lmp',
    'lossPrc',
    'cloudCover',
    'temperature',
    'windBearing',
    'windSpeed',
  ]
  const actual = findRelevantKeys(data)
  expect(actual).toEqual(expected)
})
