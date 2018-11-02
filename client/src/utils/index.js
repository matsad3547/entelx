import moment from 'moment-timezone'

export function fieldOnchange(e){
  e.preventDefault()
  this.setState({
    [e.target.id]: e.target.value,
  })
}

export const formatMillis = (millis, tz, format) => moment.tz(millis, tz).format(format)

export const findRelevantKeys = data => data.reduce( (arr, d) => {
  Object.keys(d).forEach( k => arr = !arr.includes(k) && k !== 'timestamp' ? [...arr, k] : arr )
  return arr
}, [])

export const roundToDigits = (val, digits) => {
  const rounder = 10 ** digits
  return Math.round((val * rounder))/rounder
}
