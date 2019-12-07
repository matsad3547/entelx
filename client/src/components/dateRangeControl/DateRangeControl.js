import React, {useState, useRef} from 'react'
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
  useHandleOutsideClick,
} from '../../hooks/'

const DateRangeControl = ({
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  projectId,
  displayDRS,
  setDisplayDRS,
  timeZone = 'America/Los_Angeles',
}) => {

  const showDRSelection = () => displayDRS ? setDisplayDRS(false) : setDisplayDRS(true)

  const timeSelectionRef = useRef(null)

  const onOutsideClick = () => setDisplayDRS(false)

  useHandleOutsideClick(timeSelectionRef, onOutsideClick)

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
    <div style={styles.root}>
      {
        displayDRS &&
        <div
          ref={timeSelectionRef}
          style={styles.drs} >
          <div style={styles.header}>
            <Header4 content="Select Date Range"/>
          </div>
          <DateRangeDisplay
            startTime={startTime}
            endTime={endTime}
            timeZone={timeZone}
            />
          <div
            style={styles.controls} >
            <div style={styles.buttons}>
              <Button
                value={`- ${timeIncrements[timeIncrement].label}`}
                type="primary"
                onClick={onDecrementStartTime}
                />
              <Button
                value={`+ ${timeIncrements[timeIncrement].label}`}
                type="primary"
                onClick={onIncrementStartTime}
                />
            </div>
            <div style={styles.buttons}>
              <Button
                value={`- ${timeIncrements[timeIncrement].label}`}
                type="primary"
                onClick={onDecrementEndTime}
                />
              <Button
                value={`+ ${timeIncrements[timeIncrement].label}`}
                type="primary"
                onClick={onIncrementEndTime}
                />
            </div>
          </div>
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
      }
      <div
        onClick={showDRSelection}
        className="startAndEndDates"
        style={styles.dateRange}>
        <DateRangeDisplay
          startTime={startTime}
          endTime={endTime}
          timeZone={timeZone}
          />
      </div>
    </div>
  )
}

const styles = {
  root: {
    position: 'relative',
  },
  header: {
    lineHeight: '2em',
  },
  dateRange: {
    textAlign: 'left',
    width: '50em',
    padding: '0 0 1em',
    cursor: 'pointer',
  },
  drs: {
    boxSizing: 'border-box',
    textAlign: 'left',
    background: colors.white,
    width: '52em',
    boxShadow,
    padding: '1em',
    position: 'absolute',
    left: '-1em',
    top: '-3em',
    zIndex: 2,
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
}

DateRangeControl.propTypes = {
  setStartTime: PropTypes.func.isRequired,
  setEndTime: PropTypes.func.isRequired,
  startTime: PropTypes.object.isRequired,
  endTime: PropTypes.object.isRequired,
  timeZone: PropTypes.string,
}

export default DateRangeControl
