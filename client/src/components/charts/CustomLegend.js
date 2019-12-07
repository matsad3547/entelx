import React from 'react'

import LegendTile from './LegendTile'

import {
  lineDataFormat,
  barDataFormat,
} from '../../config/chart'

import './CustomLegend.css'

const formats = {
  ...lineDataFormat,
  ...barDataFormat,
}

const CustomLegend = ({ payload }) => {

  return (

    <div style={styles.root}>
      {
        payload.map( (p, i) =>
        <div
          style={styles.dataType}
          key={`legend-${i}`}
          >
          {formats[p.value].label}: <LegendTile color={p.color}/>
        </div>
      )}
    </div>
  )
}

const styles = {
  root: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    padding: '0 5em 0 0',
  },
  dataType: {
    padding: '.3em',
    display: 'inline-flex',
    alignItems: 'baseline',
  },
}

export default CustomLegend
