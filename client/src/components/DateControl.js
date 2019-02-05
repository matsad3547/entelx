import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import Button from './button/'

import Header5 from './Header5'

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
    <Header5 content={title} />
    <div style={styles.interface}>
      {moment.tz(date, timeZone).format(dayMonthYearTimeFormat)}
      <div style={styles.buttons}>
        <Button
          value={`- ${timeIncrements[increment].label}`}
          disabled={disabled}
          type="primary"
          onClick={onDecrement}
          overrideStyles={styles.button}
          />
        <Button
          value={`+ ${timeIncrements[increment].label}`}
          disabled={disabled}
          type="primary"
          onClick={onIncrement}
          overrideStyles={styles.button}
        />
      </div>
    </div>
  </div>
)

const styles = {
  interface: {
    display: 'flex',
    flexDirection: 'column',
    width: '16em',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5em',
  },
  buttons: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    padding: '1em',
  },
  button: {
    padding: '.5em',
    margin: 0,
    width: '5em',
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
