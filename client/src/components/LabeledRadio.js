import React from 'react'
import PropTypes from 'prop-types'

import {
  fontSize,
  colors,
} from '../config/'

import { labelStyle } from './Label'

const LabeledRadio = ({
  name,
  label,
  value,
  checked,
  onChange,
  disabled = false,
}) => (

  <div style={styles.root}>
    <input
      style={getInputStyles(disabled)}
      type="radio"
      id={name}
      value={value}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      />
    <label
      htmlFor={name}
      style={{
        ...labelStyle,
        ...styles.label,
      }}
      >{label}</label>
  </div>
)

const getInputStyles = disabled => ({
  ...styles.input,
  color: disabled ? colors.gray : colors.text,
  cursor: disabled ? 'not-allowed' : 'inherit',
})

const styles = {
  root: {
    display: 'inline-flex',
    alignItems: 'baseline',
    padding: '0 .5em .5em',
  },
  input: {
    margin: '0 .5em 1em',
    fontSize: fontSize.label,
    padding: '.5em',
    background: colors.lightGray,
    border: 'none',
    borderRadius: 10,
  },
  label: {
    padding: '.2em 0',
    fontSize: '1em',
  }
}

LabeledRadio.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}

export default LabeledRadio
