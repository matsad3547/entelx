import React from 'react'
import PropTypes from 'prop-types'

import format from 'date-fns/format'

import Button from './Button'

import { dayMonthYearTimeFormat } from '../config/'

const DateControl = ({
  date,
  title,
  onIncrement,
  onDecrement,
}) => (

  <div>
    <h3>{title}:</h3>
    <div style={styles.interface}>
      {format(date, dayMonthYearTimeFormat)}
      <div style={styles.buttons}>
        <Button
          name="+ Hour"
          onClick={onIncrement}
        />
        <Button
          name="- Hour"
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
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
}

export default DateControl
