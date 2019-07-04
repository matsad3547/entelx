import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import ValueControl from './ValueControl'

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
}) => {

  const formatter = date => moment.tz(date, timeZone).format(dayMonthYearTimeFormat)

  return (
    <ValueControl
      value={date}
      format={formatter}
      title={title}
      onIncrement={onDecrement}
      onDecrement={onIncrement}
      onIncrementLabel={`${timeIncrements[increment].label}`}
      onDecrementLabel={`${timeIncrements[increment].label}`}
      disabled={disabled}
      width={'20em'}
    />
  )
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
