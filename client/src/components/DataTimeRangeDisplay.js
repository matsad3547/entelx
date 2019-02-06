import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import { monthDayTimeFormat } from '../config/'

const DataTimeRangeDisplay = ({message, startMillis, endMillis, timeZone}) => (

  <p style={styles}>
    {`${message} ${moment(startMillis).tz(timeZone).format(monthDayTimeFormat)} to ${moment(endMillis).tz(timeZone).format(monthDayTimeFormat)}`}
  </p>
)

const styles = {
  padding: '0 0 1em',
  fontSize: '.8em',
  fontStyle: 'italic',
}

DataTimeRangeDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  startMillis: PropTypes.number.isRequired,
  endMillis: PropTypes.number.isRequired,
  timeZone: PropTypes.string.isRequired,
}

export default DataTimeRangeDisplay
