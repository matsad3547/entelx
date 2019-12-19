import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import { monthDayYearTimeFormat } from '../config/'

const DataTimeDisplay = ({
  message,
  isoString,
  timeZone
}) => (

  <div style={styles}>
    {`${message} ${moment(isoString).tz(timeZone).format(monthDayYearTimeFormat)}`}
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
