import React, {useState, useEffect} from 'react'
import moment from 'moment-timezone'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Loading from '../components/loading/'
import DashboardSection from '../components/DashboardSection'
import DateControl from '../components/DateControl'
import LineBarChart from '../components/charts/LineBarChart'

import { getBaseUrl } from '../utils/'

import {
  singleRequest,
  parseResponse,
  getRequest,
} from '../utils/requestUtils'

import {timeIncrements} from '../config/'

const HistoricalDisplay = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'historical', projectId)

  const now = moment()
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
  const [weather, setWeather] = useState(false)

  const onIncrement = moment => moment.clone().add(1, timeIncrement)

  const onDecrement = moment => moment.clone().subtract(1, timeIncrement)

  const onIncrementStartTime = () => setStartTime(onIncrement(startTime))

  const onDecrementStartTime = () => setStartTime(onDecrement(startTime))

  const getData = () => {

    const startMillis = startTime.valueOf()
    const endMillis = endTime.valueOf()

    const body = {
      id: projectId,
      endMillis,
      startMillis,
      weather,
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
  }

  useEffect( () => {
    console.log('startTime?', startTime);

    getData()
  }, [])

  return (

    <ProjectPageTemplate
      title={'Last Week'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
      {
        (timeseries && config) &&
        <DashboardSection headerContent={'Historical'}>
          <LineBarChart
            barKey={'lmp'}
            data={timeseries}
            timeZone={config.timeZone}
            aspect={3}
            />
          <DateControl
            date={startTime}
            title='Start Time'
            increment={timeIncrement}
            onIncrement={onIncrementStartTime}
            onDecrement={onDecrementStartTime}
            timeZone={config.timeZone}
          />
        </DashboardSection>
      }
    </ProjectPageTemplate>
  )
}

export default HistoricalDisplay

// xRefLines={aggregate.inflections}
