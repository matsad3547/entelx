import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import { monthDayTimeFormat } from '../config/'

const DataTimeRangeDisplay = ({
  message,
  startDate,
  endDate,
  timeZone
}) => (

  <p style={styles}>
    {`${message} ${moment(startDate).tz(timeZone).format(monthDayTimeFormat)} to ${moment(endDate).tz(timeZone).format(monthDayTimeFormat)}`}
  </p>
)

const styles = {
  padding: '0 0 1em',
  fontSize: '.8em',
  fontStyle: 'italic',
}

DataTimeRangeDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired, //iso string
  endDate: PropTypes.string.isRequired, //iso string
  timeZone: PropTypes.string.isRequired,
}

export default DataTimeRangeDisplay
