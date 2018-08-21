const sum = require('./sum')

test('adds 1 and 2 to make 3', () => {
  const actual = sum(1, 2)
  const expected = 3
  expect(actual).toEqual(expected)
})

test('adds 2 and 3 to make 5', () => {
  const actual = sum(2, 3)
  const expected = 5
  expect(actual).toEqual(expected)
})

test('can use reduce to add a bunch of numbers', () => {
  const actual = [1, 2, 3].reduce( (agg, n) => sum(agg, n), 0)
  const expected = 6
  expect(actual).toEqual(expected)
})
