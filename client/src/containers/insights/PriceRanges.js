import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'
import {
  Cell,
  Bar,
} from 'recharts'

import DashboardSection from '../../components/DashboardSection'
import Label from '../../components/Label'
import DataDisplay from '../../components/DataDisplay'
import Button from '../../components/button/'
import {GenericBarChart} from '../../components/charts/'
import DateRangeControl from '../../components/dateRangeControl/'

import PriceRangesByDay from './PriceRangesByDay'

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
  rangeLabels,
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
    .subtract(3, 'month')

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

  const priceRangeChartData = priceRanges && Object.keys(priceRanges).filter( key => key !== 'belowStdDev' && key !== 'aboveStdDev').map( key => ({
      value: priceRanges[key],
      color: rangeColors[key],
      label: rangeLabels[key],
    })
  )

  return (
    <div style={styles.root}>
      <DashboardSection headerContent="Overall Price Ranges">
        {
          (project && priceRangeChartData) &&
          <GenericBarChart
            data={priceRangeChartData}
            timeZone={project.timeZone}
            aspect={4}
            >
            <Bar
              yAxisId="left"
              dataKey="value"
              fill={'#000'}
              >
              {
                priceRangeChartData.map( (entry, i) =>
                <Cell
                  fill={entry.color}
                  key={`bar-${i}`}
                  />
                )
              }
            </Bar>
          </GenericBarChart>
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
      <DashboardSection headerContent="Price Ranges by Day">
        <PriceRangesByDay
          projectId={projectId}
          cleanUrl={cleanUrl}
          />
      </DashboardSection>
      <DashboardSection headerContent="Price Ranges by Hour">

      </DashboardSection>
      <DashboardSection headerContent="Monthly Price Ranges by Hour">

      </DashboardSection>
      <DashboardSection headerContent="Seasonal Price Ranges by Hour">

      </DashboardSection>
    </div>
  )
}

const styles = {
  root: {
    padding: '2em 0',
    marginBottom: '3em',
  },
  deviation: {
    padding: '0 1em 0',
    display: 'flex',
    justifyContent: 'space-between',
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
