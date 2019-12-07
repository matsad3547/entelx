import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import Label from '../Label'
import DataDisplay from '../DataDisplay'

import {
  dayMonthYearTimeFormat,
} from '../../config/'

const DateRangeDisplay = ({
  startTime,
  endTime,
  timeZone,
}) => {

  const formatDate = date => moment.tz(date, timeZone).format(dayMonthYearTimeFormat)

  return (
    <div style={styles.root} >
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
  )
}

const styles = {
  root: {
    width: '48em',
    display: 'inline-flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  dateDisplay: {
    display: 'inline-flex',
    alignItems: 'baseline',
  },
}

DateRangeDisplay.propTypes = {
  startTime: PropTypes.string.isRequired, //iso string
  endTime: PropTypes.string.isRequired, //iso string
  timeZone: PropTypes.string.isRequired,
}

export default DateRangeDisplay
