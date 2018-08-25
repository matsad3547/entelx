import React from 'react'
import PropTypes from 'prop-types'

const Button = ({name, style, onClick}) => (

  <input
    type="button"
    value={name}
    onClick={onClick}
  />
)

Button.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func,
}

export default Button
