import React from 'react'

import {
  lineDataFormat,
  barDataFormat,
} from '../../config/chart'

import './CustomLegend.css'

const formats = {
  ...lineDataFormat,
  ...barDataFormat,
}

const CustomLegend = ({ payload }) => (

  <div style={styles.root}>
    {
      payload.map( (p, i) =>
        <div
          style={styles.dataType}
          key={`legend-${i}`}
        >
          {formats[p.value].label}: <div style={getLegendTileStyles(p.color)}/>
        </div>
    )}
  </div>
)

const getLegendTileStyles = color => ({
  ...styles.legendTile,
  background: color,
})

const styles = {
  root: {
    display: 'inline-flex',
    // background: 'purple',
    left: 30,
    top: 10,
  },
  dataType: {
    display: 'inline-flex',
    alignItems: 'baseline',
  },
  legendTile: {
    margin: '0 12px 0 6px',
    width: 20,
    height: 10,
  },
}

export default CustomLegend
