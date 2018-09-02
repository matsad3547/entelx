import React, { PureComponent } from 'react'

import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'
import subHours from 'date-fns/sub_hours'
import addHours from 'date-fns/add_hours'

import LineChartLmp from '../components/charts/LineChartLmp'
import DateControl from '../components/DateControl'
import Button from '../components/Button'
import Loading from '../components/loading/'

import { utcFormat } from '../config/'

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
      startDate,
      endDate,
    })

    this.getData(startDate, endDate)
  }

  getData = (startDate, endDate) => {

    this.setState({
      loading: true,
      data: null,
    })

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

  refreshData = () => {

    const {
      startDate,
      endDate,
    } = this.state

    this.getData(startDate, endDate)
  }

  setData = res => {
    console.log('response:', res);
    this.setState({
      loading: false,
      data: res,
      // data: res[1],
    })
  }

  incrementDate = date => addHours(date, 1)

  decrementDate = date => subHours(date, 1)

  onIncrement = date => {
    const incremented = this.incrementDate(this.state[date])
    this.setState({ [date]: incremented })
  }

  onDecrement = date => {
    const decremented = this.decrementDate(this.state[date])
    this.setState({ [date]: decremented })
  }

  setError = err => handleError(this, err)

  render() {

    const {
      startDate,
      endDate,
      loading,
      data,
    } = this.state

    return (
      <div style={styles.root}>
        <h1>CAISO Locational Marginal Prices</h1>
        <div style={styles.dates}>
          <DateControl
            date={startDate}
            title="Start Date"
            disabled={loading}
            onIncrement={() => this.onIncrement('startDate')}
            onDecrement={() => this.onDecrement('startDate')}
          />
          <DateControl
            date={endDate}
            title="End Date"
            disabled={loading}
            onIncrement={() => this.onIncrement('endDate')}
            onDecrement={() => this.onDecrement('endDate')}
          />
          <Button
            name="Refresh Data"
            disabled={loading}
            onClick={this.refreshData}
          />
        </div>
        {
          loading &&
          <Loading
            message={'CAISO data is loading...'}
          />
        }
        {
          data &&
          <LineChartLmp
            data={data}
            tz={'America/Los_Angeles'}
          />
        }
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dates: {
    display: 'inline-flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginBottom: '1em',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    width: '4em',
  },
  interface: {
    display: 'inline-flex',
    width: '18em',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
}

export default Caiso

// <div>
//   <h3>Start Date:</h3>
//   <div style={styles.interface}>
//     {format(startDate, dayMonthYearTimeFormat)}
//     <div style={styles.buttons}>
//       <Button
//         name="+ Hour"
//         onClick={() => this.onIncrement('startDate')}
//       />
//       <Button
//         name="- Hour"
//         onClick={() => this.onDecrement('startDate')}
//       />
//     </div>
//   </div>
// </div>
