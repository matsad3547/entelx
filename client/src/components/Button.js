import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  name,
  style,
  disabled = false,
  onClick,
}) => (

  <input
    type="button"
    value={name}
    style={style}
    disabled={disabled}
    onClick={onClick}
  />
)

Button.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
