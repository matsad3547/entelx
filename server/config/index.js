const utcFormat = 'YYYY-MM-DDTHH:mm:ss.sss[Z]'

const dayOf5Mins = (24 * 60) / 5

const fiveMinsAsHour = 5 / 60

const oneMinuteMillis = 60 * 1000

const fiveMinutesMillis = 5 * oneMinuteMillis

const dayMillis = 24 * 60 * oneMinuteMillis

const sixMonthMillis = 180 * dayMillis

const threeWeeksMillis = 21 * dayMillis

module.exports = {
  utcFormat,
  dayOf5Mins,
  oneMinuteMillis,
  fiveMinutesMillis,
  fiveMinsAsHour,
  sixMonthMillis,
  threeWeeksMillis,
}
