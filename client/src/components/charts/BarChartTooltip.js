import React from 'react'

import ToolTipDataLine from './ToolTipDataLine'

import { colors } from '../../config/'

const BarChartTooltip = ({
  payload,
  active
}) => {

  return (

    active &&
    <div style={styles.root}>
      { payload.map( (obj, i) =>
        <ToolTipDataLine
          label={obj.payload.label}
          color={obj.payload.color}
          value={obj.payload.value}
          key={`value-${i}`}
          />
        )}
    </div>
  )
}

const styles = {
  root: {
    minWidth: '10em',
    backgroundColor: '#fff',
    border: `1px solid ${colors.lightGray}`,
    borderRadius: 5,
    textAlign: 'left',
    padding: 5,
  },
}

export default BarChartTooltip
