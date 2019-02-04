import React from 'react'
import PropTypes from 'prop-types'

import Button from './button/'

import {
  dayMonthYearTimeFormat,
  timeIncrements,
} from '../config/'

const DateControl = ({
  date,
  title,
  increment,
  onIncrement,
  onDecrement,
  timeZone,
  disabled = false,
}) => (

  <div>
    <h3>{title}:</h3>
    <div style={styles.interface}>
      {date.format(dayMonthYearTimeFormat)}
      <div style={styles.buttons}>
        <Button
          value={`+ ${timeIncrements[increment].label}`}
          disabled={disabled}
          type="primary"
          onClick={onIncrement}
        />
        <Button
          value={`- ${timeIncrements[increment].label}`}
          disabled={disabled}
          type="primary"
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
    // width: '4em',
  },
}

DateControl.propTypes = {
  date: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  timeZone: PropTypes.string.isRequired, //timeZone
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
}

export default DateControl
