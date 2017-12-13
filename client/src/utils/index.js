import fetch from 'isomorphic-fetch'

export function fieldOnchange(e){
  e.preventDefault()
  this.setState({
    [e.target.id]: e.target.value,
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

export const singleRequest = (  url,
                                options,
                                cb,
                                errCb
                              ) =>
  fetch(url, options)
  .then(checkStatus)
  .then(parseResponse)
  .then( res => cb(res) )
  .catch( err => errCb(err) )
