import {
  findRelevantKeys,
  roundToDigits,
  getBaseUrl,
  getLocation,
} from '../index'

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

describe('roundToDigits', () => {

  test('should round a number to 2 digits', () => {
    const val = 45.674596738
    const digits = 2
    const expected = 45.67
    const actual = roundToDigits(val, digits)
    expect(actual).toEqual(expected)
  })

  test('should round a number to 3 digits', () => {
    const val = 45.674596738
    const digits = 3
    const expected = 45.675
    const actual = roundToDigits(val, digits)
    expect(actual).toEqual(expected)
  })

  test('should round a number to 4 digits', () => {
    const val = 45.674596738
    const digits = 4
    const expected = 45.6746
    const actual = roundToDigits(val, digits)
    expect(actual).toEqual(expected)
  })
})

describe('getBaseUrl', () => {
  test('should remove a path and `projectId` provided', () => {
    const url = '/demo/project/9'
    const path = 'project'
    const projectId = 9
    const actual = getBaseUrl(url, path, projectId)
    const expected = '/demo'
    expect(actual).toEqual(expected)
  })
  test('should remove a path even when no project id is present', () => {
    const url = '/demo/create_project'
    const path = 'create_project'
    const actual = getBaseUrl(url, path)
    const expected = '/demo'
    expect(actual).toEqual(expected)
  })
})

describe('getLocation', () => {
  test('should remove a base url and `projectId` provided', () => {
    const url = '/demo/project/9'
    const base = '/demo'
    const projectId = 9
    const actual = getLocation(url, base, projectId)
    const expected = 'project'
    expect(actual).toEqual(expected)
  })
})
