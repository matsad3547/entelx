import React, { PureComponent } from 'react'

import {
  singlePostRequest,
  handleError,
} from '../utils/'

class CaisoChart extends PureComponent {
  state = {
    data: null,
    loading: false,
    error: '',
  }

  componentWillMount(){

    this.setState({
      loading: true,
    })
    const today = Date.now()

    const endDate = new Date(today).toISOString()

    const startDate = new Date(today - 24 * 60 * 60 * 1000).toISOString()

    const body = JSON.stringify({
      startDate,
      endDate,
    })

    const request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body,
    }

    singlePostRequest('/caiso', request)
      .then(this.setData)
      .catch(this.setError)
  }

  setData = data => {
    console.log('data at caiso:', data)

    this.setState({
      loading: false,
      data,
    })
  }

  setError = err => handleError(this, err)

  render() {
    return (
      <div>
        <h1>CAISO Locational Marginal Prices</h1>
      </div>
    )
  }
}

export default CaisoChart
