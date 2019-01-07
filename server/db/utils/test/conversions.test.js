const {
  snakeToCamel,
  camelToSnake,
  convertObj,
} = require('../conversions')

describe('snakeToCamel', () => {
  test('should return single words untouched', () => {
    const expected = 'words'
    const actual = snakeToCamel('words')
    expect(actual).toEqual(expected)
  })

  test('should parse properly snaked strings to proper camel strings', () => {
    const expected = 'wordsAndThings'
    const actual = snakeToCamel('words_and_things')
    expect(actual).toEqual(expected)
  })

  test('should remove rando capitals', () => {
    const expected = 'wordsAndThings'
    const actual = snakeToCamel('words_aNd_things')
    expect(actual).toEqual(expected)
  })
})

describe('camelToSnake', () => {
  test('should return single words untouched', () => {
    const expected = 'words'
    const actual = camelToSnake('words')
    expect(actual).toEqual(expected)
  })

  test('should parse proper camel strings to proper snake strings', () => {
    const expected = 'words_and_things'
    const actual = camelToSnake('wordsAndThings')
    expect(actual).toEqual(expected)
  })
})

describe('convertObj', () => {
  test('should convert the snaked keys of an object to camel keys', () => {
    const obj = {
      id: 7,
      power: 2.5,
      energy: 5,
      node_id: 4940,
      name: 'Test 1',
      address: '',
      type: 'demo',
      lat: 36.32792,
      lng: -120.75784,
      city: '',
      state: 'CA',
      time_zone: 'America/Los_Angeles',
      charge_threshold: 6.23,
      discharge_threshold: 5.43,
    }
    const expected = {
      id: 7,
      power: 2.5,
      energy: 5,
      nodeId: 4940,
      name: 'Test 1',
      address: '',
      type: 'demo',
      lat: 36.32792,
      lng: -120.75784,
      city: '',
      state: 'CA',
      timeZone: 'America/Los_Angeles',
      chargeThreshold: 6.23,
      dischargeThreshold: 5.43,
    }
    const actual = convertObj(obj)
    expect(actual).toEqual(expected)
  })

  test('should pass through elements that are not objects', () => {
    const input = 16
    const expected = 16
    const actual = convertObj(input)
    expect(actual).toEqual(expected)
  })
})
