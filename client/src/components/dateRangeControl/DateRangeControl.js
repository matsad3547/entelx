import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import DataTimeDisplay from '../DataTimeDisplay'
import Label from '../Label'
import DataDisplay from '../DataDisplay'
import Button from '../button/'

import TimeIncrementSelect from './TimeIncrementSelect'

import { roundMomentToMinutes } from '../../utils/'

import {
  dayMonthYearTimeFormat,
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

  const formatDate = date => moment.tz(date, timeZone).format(dayMonthYearTimeFormat)

  return (
    <div style={styles.root}>
      {
        displayDRS &&
        <div
          ref={timeSelectionRef}
          style={styles.drs} >
          <div
            style={styles.startAndEnd} >
            <div>
              <div style={styles.dateDisplay}>
                <Label content="Start Time"/>
                <DataDisplay content={formatDate(startTime)}/>
              </div>
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
            </div>
            <div>
              <div style={styles.dateDisplay}>
                <Label content="End Time"/>
                <DataDisplay content={formatDate(endTime)}/>
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
        <div
          style={styles.startAndEnd} >
          <div>
            <div style={styles.dateDisplay}>
              <Label content="Start Time"/>
              <DataDisplay content={formatDate(startTime)}/>
            </div>
          </div>
          <div>
            <div style={styles.dateDisplay}>
              <Label content="End Time"/>
              <DataDisplay content={formatDate(endTime)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  root: {
    position: 'relative',
  },
  dateRange: {
    textAlign: 'left',
    width: '50em',
    padding: '0 0 1.5em',
    cursor: 'pointer',
  },
  drs: {
    textAlign: 'left',
    background: colors.white,
    width: '50em',
    boxShadow,
    padding: '1em',
    position: 'absolute',
    left: '-1em',
    top: '-1em',
    zIndex: 2,
  },
  startAndEnd: {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  dateDisplay: {
    display: 'inline-flex',
    alignItems: 'baseline',
  },
  buttons: {
    width: '24vw',
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
