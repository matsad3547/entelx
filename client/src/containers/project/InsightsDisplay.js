import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'

import ProjectPageTemplate from '../../components/projectPageTemplate/'
import Loading from '../../components/loading/'
import DashboardSection from '../../components/DashboardSection'
import Label from '../../components/Label'
import DataDisplay from '../../components/DataDisplay'
import Button from '../../components/button/'

import DateRangeControl from '../DateRangeControl'

import {
  getBaseUrl,
  singleRequest,
  formatDollars,
  roundMomentToMinutes,
} from '../../utils/'

import {
  blankDollars,
  defaultHeaders,
} from '../../config/'

import { useGetProject } from '../../hooks/'

const InsightsDisplay = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'insights', projectId)

  const getNow = () => roundMomentToMinutes(moment(), 5)

  const now = getNow()

  const oneWeekAgo = now.clone()
    .subtract(7, 'days')

  const [project, loadingProject] = useGetProject(projectId, cleanUrl)

  const [startTime, setStartTime] = useState(oneWeekAgo)
  const [endTime, setEndTime] = useState(now)
  const [loading, setLoading] = useState(false)
  const [aggregate, setAggregate] = useState(null)

  const getData = useCallback( async () => {

    const startDate = startTime.toISOString()
    const endDate = endTime.toISOString()

    const request = {
      method: 'GET',
      headers: defaultHeaders,
    }

    setLoading(true)

    try {
      const res = await singleRequest(`/insights/${projectId}/${startDate}/${endDate}`, request)

      const { aggregate } = await res.json()

      setAggregate(aggregate)
    }
    catch (err) {
      console.error(`There was an error getting project insight data: ${err}`)
    }
    finally {
      setLoading(false)
    }
  }, [startTime, endTime, projectId])

  useEffect( () => {
    getData()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (

    <ProjectPageTemplate
      title={project ? `${project.name} - Insights` : 'Project Data Insights'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { (loading || loadingProject) && <Loading message={''} />}
      <div style={styles.columns}>
        <DashboardSection headerContent={'Values for Potential Charging'}>
          <div style={styles.specs}>
            <Label content="Number of Events"/>
            <DataDisplay content={`${aggregate ? aggregate.belowN : 0}`}/>
            <Label content="Average Price"/>
            <DataDisplay content={`${aggregate ? formatDollars(aggregate.belowMean) : blankDollars}`}/>
            <Label content="Lowest Price"/>
            <DataDisplay content={`${aggregate ? formatDollars(aggregate.belowMin) : blankDollars}`}/>
            <Label content="Highest Price"/>
            <DataDisplay content={`${aggregate ? formatDollars(aggregate.belowMax) : blankDollars}`}/>
            <Label content="Standard Deviation"/>
            <DataDisplay content={`${aggregate ? formatDollars(aggregate.belowStdDev) : blankDollars}`}/>
          </div>
        </DashboardSection>
        <DashboardSection headerContent={'Values for Potential Discharging'}>
          <div style={styles.specs}>
            <Label content="Number of Events"/>
            <DataDisplay content={`${aggregate ? aggregate.aboveN : 0}`}/>
            <Label content="Average Price"/>
            <DataDisplay content={`${aggregate ? formatDollars(aggregate.aboveMean) : blankDollars}`}/>
            <Label content="Lowest Price"/>
            <DataDisplay content={`${aggregate ? formatDollars(aggregate.aboveMin) : blankDollars}`}/>
            <Label content="Highest Price"/>
            <DataDisplay content={`${aggregate ? formatDollars(aggregate.aboveMax) : blankDollars}`}/>
            <Label content="Standard Deviation"/>
            <DataDisplay content={`${aggregate ? formatDollars(aggregate.aboveStdDev) : blankDollars}`}/>
          </div>
        </DashboardSection>
      </div>
      <DashboardSection
        headerContent={'Select Time Range'}>
        {
          project &&
          <div style={styles.dateControl}>
            <DateRangeControl
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              startTime={startTime}
              endTime={endTime}
              projectId={projectId}
              timeZone={project.timeZone}
              />
            <div style={styles.button}>
              <Button
                value="GET INSIGHTS"
                disabled={loading}
                type="success"
                onClick={getData}
                width={'10em'}
                />
            </div>
          </div>
        }
      </DashboardSection>
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
    justifyContent: 'space-between',
    maxWidth: '60em',
    flexWrap: 'wrap',
  },
  dateControl: {
    padding: '0 0 0 1em',
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '.5em 0',
  },
}

export default InsightsDisplay
