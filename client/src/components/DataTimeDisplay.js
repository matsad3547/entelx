import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import { monthDayTimeFormat } from '../config/'

const DataTimeDisplay = ({millis, timeZone}) => (

  <p style={styles}>
    Data as of {moment(millis).tz(timeZone).format(monthDayTimeFormat)}
  </p>
)

const styles = {
  padding: '0 0 1em',
  fontSize: '.8em',
  fontStyle: 'italic',
}

DataTimeDisplay.propTypes = {
  millis: PropTypes.number.isRequired,
  timeZone: PropTypes.string.isRequired,
}

export default DataTimeDisplay
