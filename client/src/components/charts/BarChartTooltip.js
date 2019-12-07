import React from 'react'

import { colors } from '../../config/'

const BarChartTooltip = ({
  payload,
  active
}) => {

  return (

    active &&
    <div style={styles.root}>
      { payload.map( (obj, i) =>
        <p style={getTooltipStyles(obj)}
        key={`value-${i}`}
        >
        {`${obj.payload.label}:  ${obj.payload.value}`}
        </p>
        )}
    </div>
  )
}

const getTooltipStyles = (barObj) => ({
  color: barObj.payload.color,
  padding: 5,
})

const styles = {
  root: {
    minWidth: '10em',
    backgroundColor: '#fff',
    border: `1px solid ${colors.lightGray}`,
    borderRadius: 5,
    textAlign: 'left',
  },
}

export default BarChartTooltip
