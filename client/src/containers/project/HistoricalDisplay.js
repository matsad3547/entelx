import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'

import ProjectPageTemplate from '../../components/projectPageTemplate/'
import Loading from '../../components/loading/'
import Button from '../../components/button/'
import {LineBarChart} from '../../components/charts/'
import DashboardSection from '../../components/DashboardSection'
import LabeledCheckbox from '../../components/LabeledCheckbox'

import DataTimeRangeDisplay from '../../components/DataTimeRangeDisplay'

import DateRangeControl from '../../components/dateRangeControl/'

import {
  getBaseUrl,
  roundMomentToMinutes,
  singleRequest,
} from '../../utils/'

import { defaultHeaders } from '../../config/'

import { useGetProject } from '../../hooks/'

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

  const [project, loadingProject] = useGetProject(projectId, cleanUrl)

  const [startTime, setStartTime] = useState(oneWeekAgo)
  const [endTime, setEndTime] = useState(now)
  const [displayDRS, setDisplayDRS] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timeseries, setTimeseries] = useState(null)
  const [includeWeather, setIncludeWeather] = useState(false)

  const onSetIncludeWeather = e => setIncludeWeather(e.target.value === 'true')

  const getData = useCallback( async () => {

    const startDate = startTime.toISOString()

    const endDate = endTime.toISOString()

    const request = {
      method: 'GET',
      headers: defaultHeaders,
    }

    try {
      setLoading(true)

      const res = await singleRequest(`/historical/${projectId}/${startDate}/${endDate}/${includeWeather}`, request)

      const { timeseries } = await res.json()

      setTimeseries(timeseries)
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
      title={project ? `${project.name} - Historical` : 'Project Historical Analysis'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { (loading || loadingProject) && <Loading message={''} />}
      {
        (timeseries && project) &&
        <div style={styles.root}>
          <DashboardSection headerContent={'Historical Data by Date Range'}>
            <DataTimeRangeDisplay
              message="Data from"
              startDate={timeseries[0].timestamp}
              endDate={timeseries[timeseries.length - 1].timestamp}
              timeZone={project.timeZone}
              />
            <LineBarChart
              barKey={'lmp'}
              data={timeseries}
              timeZone={project.timeZone}
              aspect={3.8}
              useBrush={true}
              />
          </DashboardSection>
          <div style={styles.controls}>
            <DateRangeControl
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              startTime={startTime}
              endTime={endTime}
              projectId={projectId}
              timeZone={project.timeZone}
              displayDRS={displayDRS}
              setDisplayDRS={setDisplayDRS}
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
                  value="GET DATA"
                  disabled={loading}
                  type="success"
                  onClick={getData}
                  overrideStyles={styles.button}
                  />
              </div>
            </div>
          </div>
        </div>
      }
    </ProjectPageTemplate>
  )
}

const styles = {
  root: {
    marginBottom: '6em',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '0 0 1em',
  },
  request: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  include: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  getData: {
    margin: '.5em 0 0 1.5em',
  },
}

export default HistoricalDisplay
