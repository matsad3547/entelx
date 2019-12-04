import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import './NavButton.css'

const NavButton = ({
  baseUrl,
  link,
  id,
  label,
  current,
}) => (

  <NavLink
    exact
    to={`${baseUrl}/${link}/${id}`}
    activeClassName="currentButton"
    className="navButton"
    >
    {label}
  </NavLink>
)

NavButton.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default NavButton
