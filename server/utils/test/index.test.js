const {
  convertMillisToSeconds,
  convertSecondsToMillis,
} = require('../index')

test('convertMillisToSeconds should convert a number of millis to a rounded number of seconds', () => {
  const millis = 1535643948338
  const actual = convertMillisToSeconds(millis)
  const expected = 1535643948
  expect(actual).toEqual(expected)
})

test('convertSecondsToMillis should convert a number of seconds into a number of millis', () => {
  const seconds = 25513200000
  const actual = convertSecondsToMillis(seconds)
  const expected = 25513200000000
  expect(actual).toEqual(expected)
})
