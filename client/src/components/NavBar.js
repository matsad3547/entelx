import React from 'react'

import DisableableLink from './DisableableLink'

const NavBar = () => (

  <div style={styles.root}>
    <nav style={styles.nav}>
      <DisableableLink to="/">
        Home
      </DisableableLink>
      <DisableableLink to="/demo">
        Demo
      </DisableableLink>
      <DisableableLink to="/login" disabled={true} >
        Log In
      </DisableableLink>
      <DisableableLink to="/signup" disabled={true} >
        Sign Up
      </DisableableLink>
    </nav>
  </div>
)

const styles = {
  root: {
    textAlign: 'right',
  },
  nav: {
    display: 'inline-flex',
    width: '18em',
    justifyContent: 'space-between',
    padding: '1em 3em',
  },
}

export default NavBar
