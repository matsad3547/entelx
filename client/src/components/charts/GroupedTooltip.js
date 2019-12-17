import React from 'react'

import {
  colors,
} from '../../config/'

import ToolTipDataLine from './ToolTipDataLine'

const GroupedTooltip = ({
  payload,
  label,
  active,
  timeZone,
  labelFormatter = label => label,
}) => {

  return (

    active &&
    <div style={styles.root}>
      <p style={styles.label}>
        {labelFormatter(label)}
      </p>
      { payload.map( (obj, i) =>
        <ToolTipDataLine
          label={obj.name}
          color={obj.fill}
          value={obj.value}
          formatter={obj.formatter}
          unit={obj.unit}
          key={`value-${i}`}
          />
      )}
    </div>
  )
}

const styles = {
  root: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.mediumGray}`,
    borderRadius: 5,
    textAlign: 'left',
    padding: 5,
  },
  label: {
    padding: 5,
    fontSize: '1.1em'
  },
}

export default GroupedTooltip
