import React from 'react'

import {
  colors,
} from '../../config/'

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
        <p
          style={styles.data}
          key={`value-${i}`}
          >
          <span style={getDataLabelStyle(obj.fill)}>{`${obj.name}:  `}</span>
          <strong style={styles.dataValue}>{`${obj.formatter(obj.value)} ${obj.unit || ''}`}</strong>
        </p>
      )}
    </div>
  )
}

const getDataLabelStyle = fill => ({
  color: fill,
})

const styles = {
  root: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.mediumGray}`,
    borderRadius: 5,
    textAlign: 'left',
    padding: 5,
    position: 'relative',
    zIndex: 999,
  },
  label: {
    padding: 5,
    fontSize: '1.1em'
  },
  data: {
    padding: 5,
  },
  dataValue: {
    color: colors.darkGray,
  }
}

export default GroupedTooltip
