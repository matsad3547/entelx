import React from 'react'

import ToolTipDataLine from './ToolTipDataLine'

import {
  dOWDateTimeFormat,
  lineDataFormat,
  barDataFormat,
} from '../../config/'

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
}) => {

  return (

    active &&
    <div style={styles.root}>
      <p style={styles.date}>
        {formatDate(label, timeZone, dOWDateTimeFormat)}
      </p>
      { payload.map( (obj, i) =>
        <ToolTipDataLine
          label={formats[obj.name].label}
          color={obj.color}
          value={obj.value}
          formatter={formats[obj.name].format}
          unit={formats[obj.name].unit}
          key={`value-${i}`}
          />
      )}
    </div>
  )
}


const styles = {
  root: {
    backgroundColor: '#fff',
    border: '1px solid #a8a2aa',
    borderRadius: 5,
    textAlign: 'left',
    padding: 5,
  },
  date: {
    padding: 5,
    fontSize: '1.1em'
  },
}

export default TimeseriesTooltip
