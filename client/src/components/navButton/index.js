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
  current,
}) => (

  <Link
    to={`${baseUrl}/${link}/${id}`}
    style={styles.link}
    >
    <li
      className={getClassName(current)}
      style={styles.label}
      >
      {label}
    </li>
  </Link>
)

const getLabelStyles = current => ({
  ...styles.label,
  cursor: current ? 'not-allowed' : 'pointer',
  background: current ? colors.lightGray : colors.white,
})

const getClassName = current => current ? 'navButton current' : 'navButton'

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
  current: PropTypes.bool.isRequired,
}

export default NavButton
