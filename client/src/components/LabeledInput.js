import React from 'react'
import PropTypes from 'prop-types'

import { fontSize } from '../config/styles'

const LabeledInput = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  inputWidth = 'auto',
}) => (

  <div style={styles.root}>
    <label
      htmlFor={name}
      style={styles.label}
      >{label}</label>
    <input
      style={getInputStyles(inputWidth)}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={ e => onChange(e, name) }
      />
  </div>
)

const getInputStyles = inputWidth => ({
  ...styles.input,
  width: inputWidth,
})

const styles = {
  root: {
    display: 'block',
    width: '100%',
  },
  label: {
    display: 'block',
    fontSize: '1.1em',
  },
  input: {
    margin: '1em 1em',
    fontSize: '1em',
    padding: '.4em',
  },

}

LabeledInput.propTypes = {
  content: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  inputWidth: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default LabeledInput
