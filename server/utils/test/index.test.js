const {
  convertMillisToSeconds,
} = require('../index')

test('convertMillisToSeconds should convert a number of millis to a rounded number of seconds', () => {
  const millis = 1535643948338
  const actual = convertMillisToSeconds(millis)
  const expected = 1535643948
  expect(actual).toEqual(expected)
})
