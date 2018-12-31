const {
  snakeToCamel,
  camelToSnake,
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
