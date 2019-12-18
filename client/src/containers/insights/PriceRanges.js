import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'
import {
  Cell,
  Bar,
} from 'recharts'
import PropTypes from 'prop-types'

import DashboardSection from '../../components/DashboardSection'
import Label from '../../components/Label'
import DataDisplay from '../../components/DataDisplay'
import Button from '../../components/button/'
import {GenericBarChart} from '../../components/charts/'
import DateRangeControl from '../../components/dateRangeControl/'
import SpaceFillerLoading from '../../components/spaceFillerLoading/'

import PriceRangesBySlice from './PriceRangesBySlice'

import {
  getBaseUrl,
  singleRequest,
  formatDollars,
  roundMomentToMinutes,
} from '../../utils/'

import {
  blankDollars,
  defaultHeaders,
  rangeDataFormat,
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
  const [rangeData, setRangeData] = useState(null)

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

      setRangeData(priceRangeData)
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

  const chartData = rangeData && Object.keys(rangeData).filter( key => key !== 'belowStdDev' && key !== 'aboveStdDev').map( key => ({
      value: rangeData[key],
      color: rangeDataFormat[key].color,
      label: rangeDataFormat[key].label,
    })
  )

  return (
    <div style={styles.root}>
      <DashboardSection headerContent="Overall Price Ranges">
        <div style={styles.chart}>
          {
            (project && chartData) ?
            <GenericBarChart
              data={chartData}
              timeZone={project.timeZone}
              aspect={4}
              >
              <Bar
                yAxisId="left"
                dataKey="value"
                fill={'#000'}
                >
                {
                  chartData.map( (entry, i) =>
                  <Cell
                    fill={entry.color}
                    key={`bar-${i}`}
                    />
                )
              }
            </Bar>
          </GenericBarChart> :
          <SpaceFillerLoading
            message="Loading Price Ranges..."
            aspect={4}
            />
        }
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
          value="GET PRICE RANGES"
          disabled={loading}
          type="success"
          onClick={getData}
          />
      </div>
      <DashboardSection headerContent="Deviation Values">
        <div style={styles.deviation}>
          <div>
            <Label content="Standard Deviation for Charge Events"/>
            <DataDisplay content={`${rangeData ? formatDollars(rangeData.belowStdDev) : blankDollars}`}/>
          </div>
          <div>
            <Label content="Standard Deviation for Discharge Events"/>
            <DataDisplay content={`${rangeData ? formatDollars(rangeData.aboveStdDev) : blankDollars}`}/>
          </div>
        </div>
      </DashboardSection>
      <DashboardSection headerContent="Price Ranges by Day">
        {
          project &&
          <PriceRangesBySlice
            project={project}
            slice="day"
            buttonLabel="GET RANGES BY DAY"
            />
        }
      </DashboardSection>
      <DashboardSection headerContent="Price Ranges by Hour">
        {
          project &&
          <PriceRangesBySlice
            project={project}
            slice="hour"
            buttonLabel="GET RANGES BY HOUR"
            />
        }
      </DashboardSection>
      {/*<DashboardSection headerContent="Monthly Price Ranges by Hour">

      </DashboardSection>
      <DashboardSection headerContent="Seasonal Price Ranges by Hour">

      </DashboardSection>*/}
    </div>
  )
}

const styles = {
  root: {
    padding: '2em 0',
    marginBottom: '3em',
  },
  chart: {
    padding: '1em 0',
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

PriceRanges.propTypes = {
  projectId: PropTypes.string.isRequired,
}

export default PriceRanges
