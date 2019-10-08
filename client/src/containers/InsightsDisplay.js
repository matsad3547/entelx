import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Loading from '../components/loading/'
import DashboardSection from '../components/DashboardSection'
import Label from '../components/Label'
import DataDisplay from '../components/DataDisplay'
import Button from '../components/button/'

import DateRangeControl from './DateRangeControl'

import {
  getBaseUrl,
} from '../utils/'

import { singleRequest } from '../utils/requestUtils'

import { formatDollars } from '../utils/'

import { roundMomentToMinutes } from '../utils/dateTimeUtils'

import {
  blankDollars,
  defaultHeaders,
} from '../config/'

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

  const [startTime, setStartTime] = useState(oneWeekAgo)
  const [endTime, setEndTime] = useState(now)
  const [loading, setLoading] = useState(false)
  const [aggregate, setAggregate] = useState(null)
  const [config, setConfig] = useState(null)

  const getData = useCallback( async () => {

    const startMillis = startTime.valueOf()
    const endMillis = endTime.valueOf()

    const body = {
      id: projectId,
      endMillis,
      startMillis,
    }

    const request = {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body)
    }

    setLoading(true)

    try {
      const res = await singleRequest('/insights/', request)

      const parsed = await res.json()

      setAggregate(parsed.aggregate)
      setConfig(parsed.config)
    }
    catch (err) {
      console.error(`There was an error retrieving your project: ${err}`)
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
      title={config ? `${config.projectName} - Insights` : 'Project Data Insights'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
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
          config &&
          <div style={styles.dateControl}>
            <DateRangeControl
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              startTime={startTime}
              endTime={endTime}
              projectId={projectId}
              timeZone={config.timeZone}
              />
            <div style={styles.button}>
              <Button
                value="Get Insights"
                disabled={loading}
                type="success"
                onClick={getData}
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
  },
  dateControl: {
    padding: '0 0 0 1em',
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1em 0',
  },
}

export default InsightsDisplay
