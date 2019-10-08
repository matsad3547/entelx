import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Loading from '../components/loading/'
import Button from '../components/button/'
import LineBarChart from '../components/charts/LineBarChart'
import DashboardSection from '../components/DashboardSection'
import LabeledCheckbox from '../components/LabeledCheckbox'

import DataTimeRangeDisplay from '../components/DataTimeRangeDisplay'

import DateRangeControl from './DateRangeControl'

import { getBaseUrl } from '../utils/'

import { roundMomentToMinutes } from '../utils/dateTimeUtils'

import {
  singleRequest,
} from '../utils/requestUtils'

import { defaultHeaders } from '../config/'

const HistoricalDisplay = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'historical', projectId)

  const getNow = () => roundMomentToMinutes(moment(), 5)

  const now = getNow()

  const oneWeekAgo = now.clone()
    .subtract(7, 'days')

  const [startTime, setStartTime] = useState(oneWeekAgo)
  const [endTime, setEndTime] = useState(now)
  const [loading, setLoading] = useState(false)
  const [timeseries, setTimeseries] = useState(null)
  // const [aggregate, setAggregate] = useState(null)
  const [config, setConfig] = useState(null)
  const [includeWeather, setIncludeWeather] = useState(false)

  const onSetIncludeWeather = e => setIncludeWeather(e.target.value === 'true')

  const getData = useCallback( async () => {

    const startMillis = startTime.valueOf()

    const endMillis = endTime.valueOf()

    const body = {
      id: projectId,
      endMillis,
      startMillis,
      includeWeather,
    }

    const request = {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body)
    }

    try {
      setLoading(true)

      const res = await singleRequest('/historical/', request)

      const parsed = await res.json()

      setConfig(parsed.config)

      setTimeseries(parsed.timeseries)
    }
    catch (err) {
      console.error(`There was an error retrieving historical data for your project: ${err}`)
    }
    finally {
      setLoading(false)
    }
  }, [startTime, endTime, includeWeather, projectId])

  useEffect( () => {
    getData()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (

    <ProjectPageTemplate
      title={config ? `${config.projectName} - Historical` : 'Project Historical Analysis'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
      {
        (timeseries && config) &&
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
              useBrush={true}
              />
          </DashboardSection>
          <DashboardSection
            headerContent={'Select Time Range'}>
            <div style={styles.controls}>
              <DateRangeControl
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                startTime={startTime}
                endTime={endTime}
                projectId={projectId}
                timeZone={config.timeZone}
                />
              <div style={styles.request}>
                <div style={styles.include}>
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
                    onClick={getData}
                    overrideStyles={styles.button}
                    />
                </div>
              </div>
            </div>
          </DashboardSection>
        </div>
      }
    </ProjectPageTemplate>
  )
}

const styles = {
  controls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  request: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  include: {
    width: '22em',
    display: 'inline-flex',
    justifyContent: 'space-between',
    padding: '2em 0 0',
  },
  getData: {
    margin: '.5em 0 0 1.5em',
  },
}

export default HistoricalDisplay

// xRefLines={aggregate.inflections}
