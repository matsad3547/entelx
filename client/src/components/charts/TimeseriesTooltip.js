import React from 'react'

import { dOWDateTimeFormat} from '../../config/'

import {
  lineDataFormat,
  barDataFormat,
} from '../../config/chart'

import { formatDate } from '../../utils/'

const formats = {
  ...lineDataFormat,
  ...barDataFormat,
}

const TimeseriesTooltip = ({
  payload,
  label,
  active,
  timeZone,
 }) => (

  active &&
    <div style={styles.root}>
      <p style={styles.date}>
        {formatDate(label, timeZone, dOWDateTimeFormat)}
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
              `${formats[obj.name].label}:  ${formats[obj.name].format(obj.value)}${formats[obj.name].unit}`
            }
         </p>
      )}
    </div>
)

const styles = {
  root: {
    backgroundColor: '#fff',
    border: '1px solid #a8a2aa',
    borderRadius: 5,
    textAlign: 'left',
  },
  date: {
    padding: 5,
    fontSize: '1em'
  },
}

export default TimeseriesTooltip
