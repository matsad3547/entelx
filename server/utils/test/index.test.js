const {
  convertMillisToSeconds,
  convertSecondsToMillis,
} = require('../index')

test('convertMillisToSeconds should convert a number of millis to a rounded number of seconds', () => {
  const millis = 1535643948338
  const actual = convertMillisToSeconds(millis)
  const expected = 25594066
  expect(actual).toEqual(expected)
})

test('convertSecondsToMillis should convert a number of seconds into a number of millis', () => {
  const seconds = 25513200
  const actual = convertSecondsToMillis(seconds)
  const expected = 1530792000000
  expect(actual).toEqual(expected)
})
