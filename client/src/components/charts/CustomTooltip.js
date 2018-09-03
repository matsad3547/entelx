import React from 'react'
import format from 'date-fns/format'
import {
  monthDayTimeFormat,
  dataLabels,
} from '../../config/'

import { millisToTzDate } from '../../utils/'

const CustomTooltip = ({
  type,
  payload,
  label,
  active,
  tz,
 }) => {

  const formatXDate = millis => format(millisToTzDate(millis, tz), monthDayTimeFormat)

  return (
    active ?
      <div style={styles.root}>
        <p style={styles.date}>
          {formatXDate(label)}
        </p>
        { payload.map( (obj, i) =>
          <p
            style={
              {
                color: obj.color,
                padding: 5,
              }
            }
            key={`value-${i}`}
            >
              {
                `${dataLabels[obj.name].label}:  ${dataLabels[obj.name].format(obj.value)}${dataLabels[obj.name].unit}`
              }
           </p>
        )}
      </div> : null
  )
}

const styles = {
  root: {
    backgroundColor: '#fff',
    border: '1px solid #a8a2aa',
    borderRadius: 5,
  },
  date: {
    padding: 5,
    fontSize: '1em'
  },
}

export default CustomTooltip
