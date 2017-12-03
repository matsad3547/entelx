const sum = require('./sum')

test('adds 1 and 2 to make 3', () => {
  const actual = sum(1, 2)
  const expected = 3
  expect(actual).toEqual(expected)
})
