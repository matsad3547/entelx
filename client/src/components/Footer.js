import React from 'react'
import { Link } from 'react-router-dom'

import Header4 from './Header4'

import { colors } from '../config/styles'

const Footer = () => (

  <div style={styles.root} >
    <Link
      to="/about"
      style={styles.link}
      >
      <Header4
        content={'About'}
      />
    </Link>
    <Link
      to="/contact"
      style={styles.link}
      >
      <Header4
        content={'Contact'}
      />
    </Link>
  </div>
)

const styles = {
  root: {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-around',
    margin: '0 0 5em',
  },
  link: {
    color: colors.text,
    textDecoration: 'none',
  },
}

export default Footer
