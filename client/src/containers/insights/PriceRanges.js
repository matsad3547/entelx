import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'

import DashboardSection from '../../components/DashboardSection'
import Label from '../../components/Label'
import DataDisplay from '../../components/DataDisplay'
import Button from '../../components/button/'

import DateRangeControl from '../DateRangeControl'

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

const PriceRanges = ({
  match,
  projectId,
}) => {

  const { url } = match

  const cleanUrl = getBaseUrl(url, 'insights', projectId)

  const getNow = () => roundMomentToMinutes(moment(), 5)

  const now = getNow()

  const oneWeekAgo = now.clone()
    .subtract(7, 'days')

  const [project] = useGetProject(projectId, cleanUrl)

  const [startTime, setStartTime] = useState(oneWeekAgo)
  const [endTime, setEndTime] = useState(now)
  const [loading, setLoading] = useState(false)
  const [priceRanges, setPriceRanges] = useState(null)

  const getData = useCallback( async () => {

    const startDate = startTime.toISOString()
    const endDate = endTime.toISOString()

    const request = {
      method: 'GET',
      headers: defaultHeaders,
    }

    setLoading(true)

    try {
      const res = await singleRequest(`/price_ranges/${projectId}/${startDate}/${endDate}`, request)

      const { ranges } = await res.json()

      setPriceRanges(ranges)
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
      <DashboardSection headerContent={'Values for Potential Charging'}>
        <div style={styles.specs}>
          {/*<Label content="Number of Events"/>
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
          <DataDisplay content={`${aggregate ? formatDollars(aggregate.belowStdDev) : blankDollars}`}/>*/}
        </div>
      </DashboardSection>
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

export default PriceRanges
