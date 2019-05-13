import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import { monthDayTimeFormat } from '../config/'

const DataTimeDisplay = ({message, millis, timeZone}) => (

  <p style={styles}>
    {`${message} ${moment(millis).tz(timeZone).format(monthDayTimeFormat)}`}
  </p> 
)

const styles = {
  padding: '0 0 1em',
  fontSize: '.8em',
  fontStyle: 'italic',
}

DataTimeDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  millis: PropTypes.number.isRequired,
  timeZone: PropTypes.string.isRequired,
}

export default DataTimeDisplay
