import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './NavButton.css'

import { colors } from '../../config/styles'

const NavButton = ({
  baseUrl,
  link,
  id,
  label,
}) => (

  <Link
    to={`${baseUrl}/${link}/${id}`}
    style={styles.link}
    >
    <li
      className="navButton"
      style={styles.label}
      >
      {label}
    </li>
  </Link>
)

const styles = {
  label: {
    textAlign: 'left',
    listStyle: 'none',
    padding: '1em .5em',
  },
  link: {
    fontSize: '1.2em',
    textDecoration: 'none',
    color: colors.text,
  },
}

NavButton.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default NavButton
