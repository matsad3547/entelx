import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Loading from '../components/loading/'
import Button from '../components/button/'
import DashboardSection from '../components/DashboardSection'
import DateControl from '../components/DateControl'
import TimeIncrementSelect from '../components/TimeIncrementSelect'
import LabeledCheckbox from '../components/LabeledCheckbox'
import DataTimeDisplay from '../components/DataTimeDisplay'
import DataTimeRangeDisplay from '../components/DataTimeRangeDisplay'

import Label from '../components/Label'
import DataDisplay from '../components/DataDisplay'

import { getBaseUrl } from '../utils/'

import {
  singleRequest,
  parseResponse,
  getRequest,
} from '../utils/requestUtils'

import {timeIncrements} from '../config/'

import { useConnectToServerSideEvent } from '../hooks/'

import { roundToDigits } from '../utils/'

const InsightsDisplay = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'insights', projectId)

  const getNow = () => moment()

  const now = getNow()
  const threeWeekAgo = now.clone()
    .subtract(7, 'days')

  const incrementsArr = Object.keys(timeIncrements)

  const [startTime, setStartTime] = useState(threeWeekAgo)
  const [endTime, setEndTime] = useState(now)
  const [timeIncrement, setTimeIncrement] = useState(incrementsArr[1])
  const [loading, setLoading] = useState(false)
  const [timeseries, setTimeseries] = useState(null)
  const [data, setData] = useState(null)
  // const [aggregate, setAggregate] = useState(null)
  const [config, setConfig] = useState(null)
  const [includeWeather, setIncludeWeather] = useState(false)
  const [minDate, setMinDate] = useState(null)

  const getData = useCallback(() => {

    const startMillis = startTime.valueOf()
    const endMillis = endTime.valueOf()

    const body = {
      id: projectId,
      endMillis,
      startMillis,
    }

    setLoading(true)
    singleRequest('/insights/', getRequest('POST', JSON.stringify(body)))
      .then(parseResponse)
      .then( res => {
        console.log('res:', res);
        setLoading(false)
        setData(res.data)
        // setConfig(res.config)
        // setTimeseries(res.timeseries)
        // setAggregate(res.aggregate)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error retrieving your project: ${err}`)
      })
  }, [startTime, endTime, projectId])

  useEffect( () => {
    getData()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (

    <ProjectPageTemplate
      title={config ? `${config.projectName} - Insights` : 'Project Data Insights'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
      <div style={styles.columns}>
        <DashboardSection headerContent={'Values for Potential Charging'}>
          <div style={styles.specs}>
            <Label content="Average Price"/>
            <DataDisplay content={`$${data ? roundToDigits(data.belowMean, 2) : '-.--'}`}/>
            <Label content="Lowest Price"/>
            <DataDisplay content={`$${data ? roundToDigits(data.belowMin, 2) : '-.--'}`}/>
            <Label content="Highest Price"/>
            <DataDisplay content={`$${data ? roundToDigits(data.belowMax, 2) : '-.--'}`}/>
            <Label content="Standard Deviation"/>
            <DataDisplay content={`$${data ? roundToDigits(data.belowStdDev, 2) : '-.--'}`}/>
          </div>
        </DashboardSection>
        <DashboardSection headerContent={'Values for Potential Discharging'}>
          <div style={styles.specs}>
            <Label content="Average Price"/>
            <DataDisplay content={`$${data ? roundToDigits(data.aboveMean, 2) : '-.--'}`}/>
            <Label content="Lowest Price"/>
            <DataDisplay content={`$${data ? roundToDigits(data.aboveMin, 2) : '-.--'}`}/>
            <Label content="Highest Price"/>
            <DataDisplay content={`$${data ? roundToDigits(data.aboveMax, 2) : '-.--'}`}/>
            <Label content="Standard Deviation"/>
            <DataDisplay content={`$${data ? roundToDigits(data.aboveStdDev, 2) : '-.--'}`}/>
          </div>
        </DashboardSection>
      </div>
    </ProjectPageTemplate>
  )
}

const styles = {
  specs: {
    padding: '0 2em',
  },
  columns: {
    display: 'flex',
    flexDirection: 'rows',
    justifyContent: 'space-around',
  },
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
