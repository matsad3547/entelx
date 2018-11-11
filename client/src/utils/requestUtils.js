export const parseResponse = res => res.json()

export const handleError = (self, err) => self.setState({
  loading: false,
  showError: true,
  error: err.message,
})

export const getRequest = (method, body) => ({
  method,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body,
})

export const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  else {
    const error = new Error(`HTTP Error: ${res.status} ${res.statusText}`)
    error.status = res.statusText
    error.response = res
    throw error
  }
}

export const singleRequest = (path, options) => new Promise( (resolve, reject) => fetch(path, options)
    .then(checkStatus)
    .then(resolve)
    .catch(reject)
  )
