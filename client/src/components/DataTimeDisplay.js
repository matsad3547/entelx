import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import { monthDayTimeFormat } from '../config/'

const DataTimeDisplay = ({
  message,
  isoString,
  timeZone
}) => (

  <div style={styles}>
    {`${message} ${moment(isoString).tz(timeZone).format(monthDayTimeFormat)}`}
  </div>
)

const styles = {
  fontSize: '.8em',
  fontStyle: 'italic',
}

DataTimeDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  isoString: PropTypes.string.isRequired,
  timeZone: PropTypes.string.isRequired,
}

export default DataTimeDisplay
