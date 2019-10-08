import React, {useState} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import DateControl from '../components/DateControl'
import TimeIncrementSelect from '../components/TimeIncrementSelect'
import DataTimeDisplay from '../components/DataTimeDisplay'

import { roundMomentToMinutes } from '../utils/dateTimeUtils'

import { timeIncrements } from '../config/'

import { useMinDate } from '../hooks/'

const DateRangeControl = ({
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  projectId,
  timeZone = 'America/Los_Angeles',
}) => {

  const getNow = () => roundMomentToMinutes(moment(), 5)

  const incrementsArr = Object.keys(timeIncrements)

  const [timeIncrement, setTimeIncrement] = useState(incrementsArr[1])

  const onIncrement = moment => moment.clone().add(1, timeIncrement)

  const onDecrement = moment => moment.clone().subtract(1, timeIncrement)

  const onIncrementStartTime = () => {
    const incremented = onIncrement(startTime)

    incremented.isBefore(endTime) ? setStartTime(incremented) : setStartTime(endTime.clone().subtract(1, 'day'))
  }

  const onDecrementStartTime = () => {

    const decremented = onDecrement(startTime)

    decremented.isAfter(minDate) ? setStartTime(decremented) : setStartTime(minDate.clone())
  }

  const onIncrementEndTime = () => {
    const incremented = onIncrement(endTime)

    incremented.isBefore(getNow()) ? setEndTime(incremented) : setEndTime(getNow())
  }

  const onDecrementEndTime = () => {
    const decremented = onDecrement(endTime)

    decremented.isAfter(startTime) ? setEndTime(decremented) : setEndTime(startTime.clone().add(1, 'day'))
  }

  const onTimeIncrementSelect = e => setTimeIncrement(e.target.value)

  const minDate = useMinDate(projectId)

  return (
    <div style={styles.root}>
      <div style={styles.minDate}>
        <DataTimeDisplay
          message="Earliest data currently available is from"
          millis={minDate.valueOf()}
          timeZone={timeZone}
          />
      </div>
      <div style={styles.controls}>
        <TimeIncrementSelect
          onSelect={onTimeIncrementSelect}
          selected={timeIncrement}
          />
        <DateControl
          date={startTime}
          title='Start Time'
          increment={timeIncrement}
          onIncrement={onIncrementStartTime}
          onDecrement={onDecrementStartTime}
          timeZone={timeZone}
          />
        <DateControl
          date={endTime}
          title='End Time'
          increment={timeIncrement}
          onIncrement={onIncrementEndTime}
          onDecrement={onDecrementEndTime}
          timeZone={timeZone}
          />
      </div>
    </div>
  )
}

const styles = {
  root: {
    padding: '0 0 0 1em',
  },
  minDate: {
    padding: '1em 0 0',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}

DateRangeControl.propTypes = {
  setStartTime: PropTypes.func.isRequired,
  setEndTime: PropTypes.func.isRequired,
  startTime: PropTypes.object.isRequired,
  endTime: PropTypes.object.isRequired,
  timeZone: PropTypes.string,
}

export default DateRangeControl
