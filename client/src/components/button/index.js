import React from 'react'
import PropTypes from 'prop-types'

import { buttons } from '../../config/styles'

const Button = ({
  value,
  type,
  onClick,
  disabled = false,
  overrideStyles = {}
}) => {

  const getStyles = type => ({
    ...styles.root,
    ...buttons[type],
    ...overrideStyles,
  })

  return (
    <input
      type="button"
      value={value}
      style={getStyles(type)}
      disabled={disabled}
      onClick={onClick}
      />
  )
}

const styles = {
  root: {
  	MozBorderRadius: 10,
  	WebkitBorderRadius: 10,
  	borderRadius: 10,
  	display: 'inline-block',
  	cursor: 'pointer',
  	fontSize: '1.3em',
  	padding: '1em',
    margin: '1em 0',
  },
}

Button.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  overrideStyles: PropTypes.object,
}

export default Button
