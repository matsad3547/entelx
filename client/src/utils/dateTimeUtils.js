import moment from 'moment-timezone'

export const roundMomentToMinutes = (mt, minutes) => {
  const duration = moment.duration(minutes, 'minutes')
  return moment(Math.floor(mt/duration) * duration)
}

export const formatDate = (isoString, tz, format) => moment.tz(isoString, tz).format(format)
