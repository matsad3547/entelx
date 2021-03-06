import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import DataTimeDisplay from '../DataTimeDisplay'
import Header4 from '../Header4'
import Button from '../button/'

import TimeIncrementSelect from './TimeIncrementSelect'
import DateRangeDisplay from './DateRangeDisplay'

import { roundMomentToMinutes } from '../../utils/'

import {
  timeIncrements,
  colors,
  boxShadow,
} from '../../config/'

import {
  useMinDate,
} from '../../hooks/'

const DateRangeSelector = ({
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  projectId,
  timeIncrement,
  setTimeIncrement,
  timeZone = 'America/Los_Angeles',
}) => {

  const getNow = () => roundMomentToMinutes(moment(), 5)

  const onIncrement = moment => moment.clone().add(1, timeIncrement)

  const onDecrement = moment => moment.clone().subtract(1, timeIncrement)

  const onIncrementStartTime = () => {
    const incremented = onIncrement(startTime)

    incremented.isBefore(endTime) ? setStartTime(incremented) : setStartTime(endTime.clone().subtract(1, 'day'))
  }

  const onDecrementStartTime = () => {

    const decremented = onDecrement(startTime)

    decremented.isAfter(minDate) ? setStartTime(decremented) : setStartTime(moment.tz(minDate, timeZone))
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
    <div
      style={styles.root} >
      <div style={styles.header}>
        <Header4 content="Select Date Range"/>
      </div>
      <DateRangeDisplay
        startTime={startTime.toISOString()}
        endTime={endTime.toISOString()}
        timeZone={timeZone}
        />
      <div
        style={styles.controls} >
        <div style={styles.buttons}>
          <Button
            value={`- ${timeIncrements[timeIncrement].label}`}
            type="primary"
            onClick={onDecrementStartTime}
            width={'6em'}
            />
          <Button
            value={`+ ${timeIncrements[timeIncrement].label}`}
            type="primary"
            onClick={onIncrementStartTime}
            width={'6em'}
            />
        </div>
        <div style={styles.buttons}>
          <Button
            value={`- ${timeIncrements[timeIncrement].label}`}
            type="primary"
            onClick={onDecrementEndTime}
            width={'6em'}
            />
          <Button
            value={`+ ${timeIncrements[timeIncrement].label}`}
            type="primary"
            onClick={onIncrementEndTime}
            width={'6em'}
            />
        </div>
      </div>
      <div style={styles.increments}>
        <TimeIncrementSelect
          onSelect={onTimeIncrementSelect}
          selected={timeIncrement}
          />
        <DataTimeDisplay
          message="Earliest data currently available is from"
          isoString={minDate}
          timeZone={timeZone}
          />
      </div>
    </div>
  )
}

const styles = {
  root: {
    boxSizing: 'border-box',
    textAlign: 'left',
    background: colors.white,
    boxShadow,
    padding: '1em',
    position: 'absolute',
    left: '-1em',
    top: '-3em',
    zIndex: 2,
  },
  header: {
    lineHeight: '2em',
  },
  controls: {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  buttons: {
    width: '18em',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 .5em .5em',
  },
  increments: {
    padding: '0 .5em',
  },
}

DateRangeSelector.propTypes = {
  setStartTime: PropTypes.func.isRequired,
  setEndTime: PropTypes.func.isRequired,
  startTime: PropTypes.object.isRequired,
  endTime: PropTypes.object.isRequired,
  timeZone: PropTypes.string,
}

export default DateRangeSelector
