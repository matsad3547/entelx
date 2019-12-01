import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { colors } from '../config/'

const DisableableLink = ({
  to,
  children,
  disabled = false,
}) => (

  <Link to={to} style={getStyles(disabled)}>{children}</Link>
)

const getStyles = disabled => ({
  textDecoration: 'none',
  color: disabled ? colors.mediumGray : colors.text,
  pointerEvents: disabled ? 'none' : 'auto',
  cursor: disabled ? 'not-allowed' : 'pointer',
})

DisableableLink.propTypes = {
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export default DisableableLink
