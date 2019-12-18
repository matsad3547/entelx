import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'
import PropTypes from 'prop-types'

import Button from '../../components/button/'
import {GroupedBarChart} from '../../components/charts/'
import DateRangeControl from '../../components/dateRangeControl/'
import SpaceFillerLoading from '../../components/spaceFillerLoading/'

import {
  singleRequest,
  roundMomentToMinutes,
  getSliceFormatter,
} from '../../utils/'

import {
  defaultHeaders,
  rangeDataFormat,
  slices,
} from '../../config/'

const PriceRangesBySlice = ({
  project,
  slice,
  buttonLabel,
}) => {

  const getNow = () => roundMomentToMinutes(moment(), 5)

  const now = getNow()

  const past = now.clone()
    .subtract(3, 'month')

  const {
    id,
    timeZone,
  } = project

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
      const res = await singleRequest(`/price_ranges_by_slice/${id}/${startDate}/${endDate}/${slice}`, request)

      const { priceRangesBySlice } = await res.json()

      setRangeData(priceRangesBySlice)
    }
    catch (err) {
      console.error(`There was an error getting project insight data: ${err}`)
    }
    finally {
      setLoading(false)
    }
  }, [startTime, endTime, id, slice])

  useEffect( () => {
    getData()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  const chartData = rangeData && Object.keys(rangeData).filter( key => key !== 'belowStdDev' && key !== 'aboveStdDev').map( key => ({
    ...rangeData[key],
    label: getSliceFormatter(slice)(key),
  }))

  const aspect = 4

  const sliceLabel = slices[slice].label

  return (
    <div style={styles.root}>
        {
          (project && chartData) ?
          <GroupedBarChart
            data={chartData}
            dataConfig={rangeDataFormat}
            timeZone={project.timeZone}
            aspect={aspect}
            /> :
          <SpaceFillerLoading
            message={`Loading Price Ranges by ${sliceLabel}...`}
            aspect={aspect}
            />
        }
      <div style={styles.controls}>
        {
          project &&
          <DateRangeControl
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            startTime={startTime}
            endTime={endTime}
            projectId={id}
            timeZone={timeZone}
            displayDRS={displayDRS}
            setDisplayDRS={setDisplayDRS}
            />
        }
        <Button
          value={buttonLabel}
          disabled={loading}
          type="success"
          onClick={getData}
          />
      </div>
    </div>
  )
}

const styles = {
  root: {
    padding: '1em 0',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '1em 0 0',
  },
}

PriceRangesBySlice.propTypes = {
  project: PropTypes.object.isRequired,
  slice: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
}

export default PriceRangesBySlice
