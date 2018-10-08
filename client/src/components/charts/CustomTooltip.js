import React from 'react'

import {
  monthDayTimeFormat,
  lineDataFormat,
} from '../../config/'

import { formatMillis } from '../../utils/'

const CustomTooltip = ({
  payload,
  label,
  active,
  tz,
 }) => (

  active ?
    <div style={styles.root}>
      <p style={styles.date}>
        {formatMillis(label, tz, monthDayTimeFormat)}
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
              `${lineDataFormat[obj.name].label}:  ${lineDataFormat[obj.name].format(obj.value)}${lineDataFormat[obj.name].unit}`
            }
         </p>
      )}
    </div> : null
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

export default CustomTooltip
