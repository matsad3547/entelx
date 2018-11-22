import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

const DataTimeDisplay = ({millis, timeZone}) => (

  <p style={styles}>
    Data as of {moment(millis).tz(timeZone).format('H:MM A')}
  </p>
)

const styles = {
  padding: '0 0 1em',
  fontSize: '.8em',
  fontStyle: 'italic',
}

DataTimeDisplay.propTypes = {
  millis: PropTypes.number,
}

export default DataTimeDisplay
