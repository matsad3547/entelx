export function fieldOnchange(e){
  e.preventDefault()
  this.setState({
    [e.target.id]: e.target.value,
  })
}

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

export const formatDollars = number => `$${roundToDigits(number, 2).toFixed(2)}`
