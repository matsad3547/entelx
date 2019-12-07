import React, {useRef} from 'react'
import PropTypes from 'prop-types'

import DateRangeSelector from './DateRangeSelector'
import DateRangeDisplay from './DateRangeDisplay'

import {
  colors,
  boxShadow,
} from '../../config/'

import {
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
