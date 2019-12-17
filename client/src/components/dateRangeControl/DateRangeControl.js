import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'

import DateRangeSelector from './DateRangeSelector'
import DateRangeDisplay from './DateRangeDisplay'

import {
  useHandleOutsideClick,
} from '../../hooks/'

import './DateRangeControl.css'

const DateRangeControl = ({
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  projectId,
  displayDRS,
  setDisplayDRS,
  initTimeIncrement = 'day',
  timeZone = 'America/Los_Angeles',
}) => {

  const [timeIncrement, setTimeIncrement] = useState(initTimeIncrement)

  const showDRSelection = () => displayDRS ? setDisplayDRS(false) : setDisplayDRS(true)

  const timeSelectionRef = useRef(null)

  const onOutsideClick = () => setDisplayDRS(false)

  useHandleOutsideClick(timeSelectionRef, onOutsideClick)

  return (
    <div style={styles.root}>
      {
        displayDRS &&
        <div ref={timeSelectionRef}>
          <DateRangeSelector
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            startTime={startTime}
            endTime={endTime}
            projectId={projectId}
            timeIncrement={timeIncrement}
            setTimeIncrement={setTimeIncrement}
            timeZone={timeZone}
            />
        </div>
      }
      <div
        onClick={showDRSelection}
        className="startAndEndDates"
        style={styles.dateRange}>
        <DateRangeDisplay
          startTime={startTime.toISOString()}
          endTime={endTime.toISOString()}
          timeZone={timeZone}
          />
      </div>
    </div>
  )
}

const styles = {
  root: {
    position: 'relative',
    padding: '0 0 1em',
  },
  dateRange: {
    cursor: 'pointer',
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
