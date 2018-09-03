import moment from 'moment-timezone'

export function fieldOnchange(e){
  e.preventDefault()
  this.setState({
    [e.target.id]: e.target.value,
  })
}

export const handleError = (self, err) => self.setState({
  loading: false,
  showError: true,
  error: err.message,
})

export const parseResponse = res => res.json()

export const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  const error = new Error(`HTTP Error: ${res.status} ${res.statusText}`)
  error.status = res.statusText;
  error.response = res
  throw error
}

export const singleGetRequest = (path, options) => new Promise( (resolve, reject) => fetch(path, options)
    .then(checkStatus)
    .then(parseResponse)
    .then(resolve)
    .catch(reject)
  )

export const singlePostRequest = ( path, options) => new Promise( (resolve, reject) => fetch(path, options)
    .then(checkStatus)
    .then(parseResponse)
    .then(resolve)
    .catch(reject)
  )

export const formatMillis = (millis, tz, format) => moment.tz(millis, tz).format(format)
