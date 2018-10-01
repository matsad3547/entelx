const {
  millisToSeconds,
} = require('../index')

test('millisToSeconds should convert a number of millis to a rounded number of seconds', () => {
  const millis = 1535643948338
  const actual = millisToSeconds(millis)
  const expected = 1535643948
  expect(actual).toEqual(expected)
})
