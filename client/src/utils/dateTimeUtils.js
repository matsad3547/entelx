import moment from 'moment-timezone'

export const roundMomentToMinutes = (mt, minutes) => {
  const duration = moment.duration(minutes, 'minutes')
  return moment(Math.floor(mt/duration) * duration)
}

export const formatDate = (isoString, tz, format) => moment.tz(isoString, tz).format(format)

export const getSliceFormatter = slice => {
  switch (slice) {
    case 'day':
      return key => moment().day(parseInt(key) + 1).format('dddd')

    case 'month':
      return key => moment().month(parseInt(key)).format('MMMM')

    case 'hour':
      return key => moment().hour(parseInt(key)).minute(0).format('h:mmA')

    default:
      return key => moment().format()
  }
}
