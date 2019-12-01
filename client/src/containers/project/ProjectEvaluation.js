import React, { PureComponent } from 'react'
import moment from 'moment-timezone'

import LineBarChart from '../components/charts/LineBarChart'
import DateControl from '../components/DateControl'
import Button from '../components/Button'
import Loading from '../components/loading/'

import {
  singlePostRequest,
  handleError,
  parseResponse,
} from '../utils/'

class ProjectEvaluation extends PureComponent {

  timeZone = 'America/Los_Angeles'
  marketType = 'RTM'
  node = 'LAPLMG1_7_B2'

  state = {
    data: null,
    loading: false,
    error: '',
    startDate: null,
    endDate: null,
  }

  componentWillMount(){

    const now = moment().tz(this.timeZone)

    const endDate = now
    const startDate = now.clone().subtract(2, 'days')

    this.setState({
      startDate,
      endDate,
    })

    this.getData(startDate, endDate)
  }

  getData = (startDate, endDate) => {

    console.time('Node Evaluator request')

    this.setState({
      loading: true,
      data: null,
    })

    const body = JSON.stringify({
      startMillis: startDate.valueOf(),
      endMillis: endDate.valueOf(),
      timeZone: this.timeZone,
      marketType: this.marketType,
      node: this.node,
    })

    const request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body,
    }

    singlePostRequest('/caiso_node_evaluator', request)
      .then(parseResponse)
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
    console.timeEnd('Node Evaluator request')
    this.setState({
      loading: false,
      data: res,
    })
  }

  incrementDate = date => date
                            .clone()
                            .add(1, 'hours')

  decrementDate = date => date
                            .clone()
                            .subtract(1, 'hours')

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
        <h1>Project Evaluation</h1>
        <h2>Evaluating {this.node}</h2>
        <div style={styles.dates}>
          <DateControl
            date={startDate}
            title="Start Date"
            disabled={loading}
            tz={this.timeZone}
            onIncrement={() => this.onIncrement('startDate')}
            onDecrement={() => this.onDecrement('startDate')}
          />
          <DateControl
            date={endDate}
            title="End Date"
            disabled={loading}
            tz={this.timeZone}
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
            message={'node data is loading...'}
          />
        }
        {
          data &&
          <LineBarChart
            data={data}
            tz={this.timeZone}
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

export default ProjectEvaluation
