import React, {useState, useEffect} from 'react'
import moment from 'moment-timezone'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Loading from '../components/loading/'
import DashboardSection from '../components/DashboardSection'
import DateControl from '../components/DateControl'
import HistoricalDataChart from '../components/HistoricalDataChart'


import { getBaseUrl } from '../utils/'

import {
  singleRequest,
  parseResponse,
  getRequest,
} from '../utils/requestUtils'

import {timeIncrements} from '../config/'

const HistoricalDisplay = ({match}) => {

  console.log('rendering?');

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
  const [weather, setWeather] = useState(false)

  const onIncrement = moment => moment.clone().add(1, timeIncrement)

  const onDecrement = moment => moment.clone().subtract(1, timeIncrement)

  const onIncrementStartTime = () => {
    const incremented = onIncrement(startTime)

    incremented.isBefore(endTime) ? setStartTime(incremented) : setStartTime(endTime.clone().subtract(1, 'day'))
  }

  const onDecrementStartTime = () => {
    const decremented = onDecrement(startTime)

    setStartTime(decremented)
    // decremented.isAfter(startTime) ? setEndTime(decremented) : setEndTime(startTime.clone().add(1, 'day'))
  }

  const onIncrementEndTime = () => {
    const incremented = onIncrement(endTime)

    incremented.isBefore(getNow()) ? setEndTime(incremented) : setEndTime(getNow())
  }

  const onDecrementEndTime = () => {
    const decremented = onDecrement(endTime)

    decremented.isAfter(startTime) ? setEndTime(decremented) : setEndTime(startTime.clone().add(1, 'day'))
  }

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

    getData()
  }, [])

  return (

    <ProjectPageTemplate
      title={'Historical Data Analysis'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
      {
        (timeseries && config) &&
        <div>
          {/*<HistoricalDataChart
            data={timeseries}
            timeZone={config.timeZone}
            />*/}
          <DashboardSection childStyles={styles.dateControls}>
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
  }
}

export default HistoricalDisplay

// xRefLines={aggregate.inflections}
