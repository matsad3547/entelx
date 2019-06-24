import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Loading from '../components/loading/'
import Button from '../components/button/'
import LineBarChart from '../components/charts/LineBarChart'
import DashboardSection from '../components/DashboardSection'
import DateControl from '../components/DateControl'
import TimeIncrementSelect from '../components/TimeIncrementSelect'
import LabeledCheckbox from '../components/LabeledCheckbox'
import DataTimeDisplay from '../components/DataTimeDisplay'
import DataTimeRangeDisplay from '../components/DataTimeRangeDisplay'

import { getBaseUrl } from '../utils/'

import {
  singleRequest,
  parseResponse,
  getRequest,
} from '../utils/requestUtils'

import {timeIncrements} from '../config/'

import { useConnectToServerSideEvent } from '../hooks/'

const InsightsDisplay = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'historical', projectId)

  const getNow = () => moment()

  const now = getNow()
  const oneWeekAgo = now.clone()
    .subtract(7, 'days')

  const incrementsArr = Object.keys(timeIncrements)

  const [startTime, setStartTime] = useState(oneWeekAgo)
  const [endTime, setEndTime] = useState(now)
  const [timeIncrement, setTimeIncrement] = useState(incrementsArr[1])
  const [loading, setLoading] = useState(false)
  const [timeseries, setTimeseries] = useState(null)
  // const [aggregate, setAggregate] = useState(null)
  const [config, setConfig] = useState(null)
  const [includeWeather, setIncludeWeather] = useState(false)
  const [minDate, setMinDate] = useState(null)

  const onIncrement = moment => moment.clone().add(1, timeIncrement)

  const onDecrement = moment => moment.clone().subtract(1, timeIncrement)

  const onIncrementStartTime = () => {
    const incremented = onIncrement(startTime)

    incremented.isBefore(endTime) ? setStartTime(incremented) : setStartTime(endTime.clone().subtract(1, 'day'))
  }

  const onDecrementStartTime = () => {
    const decremented = onDecrement(startTime)

    decremented.isAfter(minDate) ? setStartTime(decremented) : setStartTime(minDate.clone())
  }

  const onIncrementEndTime = () => {
    const incremented = onIncrement(endTime)

    incremented.isBefore(getNow()) ? setEndTime(incremented) : setEndTime(getNow())
  }

  const onDecrementEndTime = () => {
    const decremented = onDecrement(endTime)

    decremented.isAfter(startTime) ? setEndTime(decremented) : setEndTime(startTime.clone().add(1, 'day'))
  }

  const onTimeIncrementSelect = e => setTimeIncrement(e.target.value)

  const onSetIncludeWeather = e => setIncludeWeather(e.target.value === 'true')

  const onGetData = () => getData()

  const getData = useCallback(() => {

    const startMillis = startTime.valueOf()
    const endMillis = endTime.valueOf()

    const body = {
      id: projectId,
      endMillis,
      startMillis,
      includeWeather,
    }

    setLoading(true)
    singleRequest('/historical/', getRequest('POST', JSON.stringify(body)))
      .then(parseResponse)
      .then( res => {
        console.log('res:', res);
        setLoading(false)
        setConfig(res.config)
        setTimeseries(res.timeseries)
        // setAggregate(res.aggregate)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error retrieving your project: ${err}`)
      })
  }, [startTime, endTime, includeWeather, projectId])

  useEffect( () => {
    getData()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  const handleData = useCallback( e => {
    e.preventDefault()
    const {minDateMillis} = JSON.parse(e.data)
    setMinDate(moment(minDateMillis))
  }, [])

  const sseRoute = `/historical/${projectId}/min_date`

  useConnectToServerSideEvent(sseRoute, handleData)

  return (

    <ProjectPageTemplate
      title={config ? `${config.projectName} - Insights` : 'Project Data Insights'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
      {
        (timeseries && config && minDate) &&
        <div>
          <DashboardSection headerContent={'Historical Data'}>
            <DataTimeRangeDisplay
              message="Data from"
              startMillis={timeseries[0].timestamp}
              endMillis={timeseries[timeseries.length - 1].timestamp}
              timeZone={config.timeZone}
              />
            <LineBarChart
              barKey={'lmp'}
              data={timeseries}
              timeZone={config.timeZone}
              aspect={4}
              />
          </DashboardSection>
          <DashboardSection>
            <div style={styles.minDate}>
              <DataTimeDisplay
                message="Earliest data currently available is from"
                millis={minDate.valueOf()}
                timeZone={config.timeZone}
                />
            </div>
            <div style={styles.dateControls}>
              <TimeIncrementSelect
                onSelect={onTimeIncrementSelect}
                selected={timeIncrement}
                />
              <DateControl
                date={startTime}
                title='Start Time'
                increment={timeIncrement}
                onIncrement={onIncrementStartTime}
                onDecrement={onDecrementStartTime}
                timeZone={config.timeZone}
                />
              <DateControl
                date={endTime}
                title='End Time'
                increment={timeIncrement}
                onIncrement={onIncrementEndTime}
                onDecrement={onDecrementEndTime}
                timeZone={config.timeZone}
                />
              <div style={styles.inclusion}>
                <LabeledCheckbox
                  name={'include-weather'}
                  label="Include Weather"
                  value={!includeWeather}
                  checked={includeWeather}
                  onChange={onSetIncludeWeather}
                  />
                <Button
                  value="Get Data"
                  disabled={loading}
                  type="success"
                  onClick={onGetData}
                  overrideStyles={styles.getData}
                  />
              </div>
            </div>
          </DashboardSection>
        </div>
      }
    </ProjectPageTemplate>
  )
}

const styles = {
  dateControls: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  inclusion: {
    display: 'flex',
    flexDirection: 'column',
  },
  getData: {
    margin: '.5em 0 0 1.5em',
  },
  minDate: {
    padding: '0 0 1em',
  },
}

export default InsightsDisplay

// xRefLines={aggregate.inflections}
