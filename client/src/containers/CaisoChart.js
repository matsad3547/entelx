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
    startDate: null,
    endDate: null,
  }

  componentWillMount(){

    const now = new Date()

    const endDate = getDateWithOffsetAndTZ(now)

    const startDate = getDateWithOffsetAndTZ(now, 24 * 60 * 60 * 1000)

    this.setState({
      loading: true,
      startDate,
      endDate,
    })

    const body = JSON.stringify({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
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
        <div style={styles.dates}>
          <div>
            <h3>Start Date:</h3>
            {millisToDate(this.state.startDate)}
          </div>
          <div>
            <h3>End Date:</h3>
            {millisToDate(this.state.endDate)}
          </div>
        </div>
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

const styles = {
  dates: {
    display: 'inline-flex',
    justifyContent: 'space-evenly',
    width: '100%',
  },
}

export default CaisoChart
