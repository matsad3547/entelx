import React, { PureComponent } from 'react'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import {
  singlePostRequest,
  handleError,
  millisToDate,
  getDateWithOffsetAndTZ,
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
    const now = new Date()

    const endDate = getDateWithOffsetAndTZ(now).toISOString()

    const startDate = getDateWithOffsetAndTZ(now, 24 * 60 * 60 * 1000).toISOString()

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

  setData = res => this.setState({
      loading: false,
      data: res.data,
    })


  setError = err => handleError(this, err)

  render() {

    return (
      <div>
        <h1>CAISO Locational Marginal Prices</h1>
        {
          this.state.data &&
          <LineChart
            width={800}
            height={500}
            data={this.state.data}
            margin={{top: 15, right: 30, left: 60, bottom: 5}}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={millisToDate}
            />
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="lmp" stroke="#8884d8" activeDot={{r: 4}}/>
          </LineChart>
        }
      </div>
    )
  }
}

export default CaisoChart
