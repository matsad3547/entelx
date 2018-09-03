import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

import { dayMonthYearTimeFormat } from '../config/'

const DateControl = ({
  date,
  title,
  disabled = false,
  onIncrement,
  onDecrement,
  tz,
}) => (

  <div>
    <h3>{title}:</h3>
    <div style={styles.interface}>
      {date.format(dayMonthYearTimeFormat)}
      <div style={styles.buttons}>
        <Button
          name="+ Hour"
          disabled={disabled}
          onClick={onIncrement}
        />
        <Button
          name="- Hour"
          disabled={disabled}
          onClick={onDecrement}
        />
      </div>
    </div>
  </div>
)

const styles = {
  interface: {
    display: 'inline-flex',
    width: '18em',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    width: '4em',
  },
}

DateControl.propTypes = {
  date: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  tz: PropTypes.string.isRequired, //timeZone
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
}

export default DateControl
