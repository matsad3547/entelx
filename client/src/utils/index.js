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

export const setField = (e, stateFunction) => {
  e.preventDefault()
  stateFunction(e.target.value)
}

export const getBaseUrl = (url, page, projectId) => projectId ? url.replace(`/${page}/${projectId}`, '') : url.replace(`/${page}`, '')

export const formatDollars = number => `$${roundToDigits(number, 2).toFixed(2)}`

export const getLocation = (url, base, projectId) => projectId ? url.replace(`${base}/`, '').replace(`/${projectId}`, '') : url.replace(base, '')
