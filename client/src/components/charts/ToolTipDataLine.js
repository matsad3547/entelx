import React from 'react'
import PropTypes from 'prop-types'

import {
  colors,
} from '../../config/'

const ToolTipDataLine = ({
  label,
  color,
  value,
  formatter = val => val,
  unit = '',
}) => (
  <p
    style={styles.data}
    >
    <span style={{color,}}>{`${label}:  `}</span>
    <span style={styles.dataValue}>{`${formatter(value)} ${unit}`}</span>
  </p>
)

const styles = {
  data: {
    padding: 5,
  },
  dataValue: {
    color: colors.darkGray,
  }
}

ToolTipDataLine.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  formatter: PropTypes.func,
  unit: PropTypes.string,
}

export default ToolTipDataLine
