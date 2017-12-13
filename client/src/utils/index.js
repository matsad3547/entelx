import fetch from 'isomorphic-fetch'

export function fieldOnchange(e){
  e.preventDefault()
  this.setState({
    [e.target.id]: e.target.value,
  })
}

export function setError(error) {
  console.error(error)
  this.setState({
    loading: false,
    error,
  })
}

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

export const singleGetRequest = ( path,
                                  options,
                                  cb,
                                  errCb
                                ) =>
  fetch(path, options)
  .then(checkStatus)
  .then(parseResponse)
  .then( res => cb(res) )
  .catch( err => errCb(err) )

export const singlePostRequest = ( path,
                                  options,
                                  cb,
                                  errCb
                                ) =>
  fetch(path, options)
  .then(checkStatus)
  .then( res => cb(res) )
  .catch( err => errCb(err) )
