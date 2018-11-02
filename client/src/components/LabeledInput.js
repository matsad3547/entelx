import React from 'react'
import PropTypes from 'prop-types'

import {
  fontSize,
  colors,
} from '../config/styles'

const LabeledInput = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  value,
  inputWidth = 'auto',
  unit = '',
  disabled = false,
  onChange,
}) => (

  <div style={styles.root}>
    <label
      htmlFor={name}
      style={styles.label}
      >{label}</label>
    <input
      style={getInputStyles(inputWidth, disabled)}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={ e => onChange(e, name) }
      />
    <span>{unit}</span>
  </div>
)

const getInputStyles = (inputWidth, disabled) => ({
  ...styles.input,
  width: inputWidth,
  color: disabled ? colors.disabled : colors.text,
  cursor: disabled ? 'not-allowed' : 'inherit',
})

const styles = {
  root: {
    display: 'block',
  },
  label: {
    display: 'block',
    fontSize: '1.1em',
  },
  input: {
    margin: '1em .5em',
    fontSize: fontSize.label,
    padding: '.5em',
    background: colors.field,
    border: 'none',
    borderRadius: 10,
  },
}

LabeledInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  inputWidth: PropTypes.string,
  unit: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

export default LabeledInput
