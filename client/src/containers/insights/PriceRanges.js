import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'

import DashboardSection from '../../components/DashboardSection'
import Label from '../../components/Label'
import DataDisplay from '../../components/DataDisplay'
import Button from '../../components/button/'
import {GenericBarChart} from '../../components/charts/'

import DateRangeControl from '../../components/dateRangeControl/'

import {
  getBaseUrl,
  singleRequest,
  formatDollars,
  roundMomentToMinutes,
} from '../../utils/'

import {
  blankDollars,
  defaultHeaders,
  rangeColors,
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

  const past = now.clone()
    .subtract(1, 'month')

  const [project] = useGetProject(projectId, cleanUrl)

  const [startTime, setStartTime] = useState(past)
  const [endTime, setEndTime] = useState(now)
  const [displayDRS, setDisplayDRS] = useState(false)
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

      const { priceRangeData } = await res.json()

      setPriceRanges(priceRangeData)
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

  const priceRangeChartData = priceRanges && Object.keys(priceRanges).filter( key => key !== 'belowStdDev' && key !== 'aboveStdDev').map( key => {
    switch (key) {
      case 'belowThreeSigma':
        return {
          label: 'Below 3\u03C3',
          value: priceRanges.belowThreeSigma,
          color: rangeColors[0],
          order: 0,
        }
      case 'belowTwoSigma':
        return {
          label: 'Below 2\u03C3',
          value: priceRanges.belowTwoSigma,
          color: rangeColors[1],
          order: 1,
        }
      case 'belowOneSigma':
        return {
          label: 'Below 1\u03C3',
          value: priceRanges.belowOneSigma,
          color: rangeColors[2],
          order: 2,
        }
      case 'aboveOneSigma':
        return {
          label: 'Above 1\u03C3',
          value: priceRanges.aboveOneSigma,
          color: rangeColors[3],
          order: 3,
        }
      case 'aboveTwoSigma':
        return {
          label: 'Above 2\u03C3',
          value: priceRanges.aboveTwoSigma,
          color: rangeColors[4],
          order: 4,
        }
      case 'aboveThreeSigma':
        return {
          label: 'Above 3\u03C3',
          value: priceRanges.aboveThreeSigma,
          color: rangeColors[5],
          order: 5,
        }
      default:
        return {}
    }
  }).sort( (a, b) => a.order - b.order )

  return (
    <div style={styles.root}>
      <DashboardSection headerContent="Price Ranges by Period">
        {
          (project && priceRangeChartData) &&
          <GenericBarChart
            data={priceRangeChartData}
            timeZone={project.timeZone}
            aspect={4}
            />
        }
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
          value="GET PRICE RANGES"
          disabled={loading}
          type="success"
          onClick={getData}
          width={'12em'}
          />
      </div>
      <DashboardSection headerContent="Deviation Values">
        <div style={styles.deviation}>
          <div>
            <Label content="Standard Deviation for Charge Events"/>
            <DataDisplay content={`${priceRanges ? formatDollars(priceRanges.belowStdDev) : blankDollars}`}/>
          </div>
          <div>
            <Label content="Standard Deviation for Discharge Events"/>
            <DataDisplay content={`${priceRanges ? formatDollars(priceRanges.aboveStdDev) : blankDollars}`}/>
          </div>
        </div>
      </DashboardSection>
    </div>
  )
}

const styles = {
  root: {
    padding: '2em 0',
  },
  deviation: {
    padding: '0 1em 0',
    display: 'flex',
    justifyContent: 'space-between',
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
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '0 0 1em',
  },
}

export default PriceRanges
