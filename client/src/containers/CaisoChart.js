import React, { PureComponent } from 'react'

import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'

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

const formatIso = date => format(date, 'YYYY-MM-DDTHH:mm:ss.sssZ')

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

    const endDate = now

    const startDate = subDays(now, 1)

// 2018-08-25T15:26:10.267Z

    console.log(
      'now:', now,
    '\nnow millis:', endDate.getTime(),
    '\nstart date:', formatIso(startDate),
    '\nend date:', formatIso(endDate),
    '\ntz offset:', now.getTimezoneOffset()
  );

    this.setState({
      loading: true,
      startDate,
      endDate,
    })

    const body = JSON.stringify({
      startDate: formatIso(startDate),
      endDate: formatIso(endDate),
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

    if(this.state.data) {
      const now = new Date()
      const nowMillis = now.getTime()
      const latestTS = this.state.data[this.state.data.length- 1].timestamp

      console.log('time stamp difference:', (latestTS - nowMillis) / (60*60*1000));
    }

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
