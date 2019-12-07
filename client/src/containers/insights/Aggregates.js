import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'

import DashboardSection from '../../components/DashboardSection'
import Label from '../../components/Label'
import DataDisplay from '../../components/DataDisplay'
import Button from '../../components/button/'

import DateRangeControl from '../../components/dateRangeControl/'

import {
  getBaseUrl,
  singleRequest,
  formatDollars,
  formatPercentage,
  roundMomentToMinutes,
} from '../../utils/'

import {
  blankDollars,
  defaultHeaders,
} from '../../config/'

import { useGetProject } from '../../hooks/'

const Aggregates = ({
  match,
  projectId,
}) => {

  const { url } = match

  const cleanUrl = getBaseUrl(url, 'insights', projectId)

  const getNow = () => roundMomentToMinutes(moment(), 5)

  const now = getNow()

  const past = now.clone()
    .subtract(3, 'month')

  const [project] = useGetProject(projectId, cleanUrl)

  const [startTime, setStartTime] = useState(past)
  const [endTime, setEndTime] = useState(now)
  const [displayDRS, setDisplayDRS] = useState(false)
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
      const res = await singleRequest(`/aggregates/${projectId}/${startDate}/${endDate}`, request)

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

    <div style={styles.root}>
      <DashboardSection
        headerContent={'Aggregates by Date Range'}>
        <div style={styles.columns}>
          <DashboardSection headerContent={'Values for Potential Charging'}>
            <div style={styles.specs}>
              <Label content="Number of Events"/>
              <DataDisplay content={`${aggregate ? aggregate.belowN : 0}`}/>
              <Label content="Proportion of Events"/>
              <DataDisplay content={`${aggregate ? formatPercentage(aggregate.belowPercentage) : '--%'}`}/>
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
              <Label content="Proportion of Events"/>
              <DataDisplay content={`${aggregate ? formatPercentage(aggregate.abovePercentage) : '--%'}`}/>
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
      </DashboardSection>
      <div style={styles.controls}>
        {
          project &&
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
        }
        <Button
          value="GET INSIGHTS"
          disabled={loading}
          type="success"
          onClick={getData}
          width={'10em'}
          />
      </div>
    </div>
  )
}

const styles = {
  root: {
    padding: '2em 0',
  },
  specs: {
    padding: '0 2em',
  },
  columns: {
    display: 'flex',
    flexDirection: 'rows',
    justifyContent: 'space-between',
    maxWidth: '60em',
    flexWrap: 'wrap',
    padding: '1em 0 0 1em'
  },
  dateControl: {
    padding: '0 0 0 1em',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '0 0 1em',
  },
}

export default Aggregates
