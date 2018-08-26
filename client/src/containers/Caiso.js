import React, { PureComponent } from 'react'

import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'
import subHours from 'date-fns/sub_hours'

import LineChartLmp from '../components/LineChartLmp'

import {
  utcFormat,
  dayMonthYearTimeFormat,
} from '../config/'

import {
  singlePostRequest,
  handleError,
} from '../utils/'

class Caiso extends PureComponent {
  state = {
    data: null,
    loading: false,
    error: '',
    startDate: null,
    endDate: null,
  }

  componentWillMount(){

    const now = new Date()

    // TODO figure out a better way to get the current time in CA
    const endDate = subHours(now, 1) //CA time
    const startDate = subDays(endDate, 1)

    this.setState({
      loading: true,
      startDate,
      endDate,
    })

    this.getData(startDate, endDate)
  }

  getData = (startDate, endDate) => {

    const body = JSON.stringify({
      startDate: format(startDate, utcFormat),
      endDate: format(endDate, utcFormat),
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
            {format(this.state.startDate, dayMonthYearTimeFormat)}
          </div>
          <div>
            <h3>End Date:</h3>
            {format(this.state.endDate, dayMonthYearTimeFormat)}
          </div>
        </div>
        {
          this.state.data &&
          <LineChartLmp
            data={this.state.data}
            tz={'America/Los_Angeles'}
          />
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

export default Caiso
