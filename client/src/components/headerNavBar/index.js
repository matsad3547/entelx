import React from 'react'

import DisableableLink from '../DisableableLink'

import './HeaderNavBar.css'

const HeaderNavBar = () => (

  <div className="header-nav">
    <nav className="nav">
      <DisableableLink to="/">
        Home
      </DisableableLink>
      <DisableableLink to="/demo">
        Demo
      </DisableableLink>
      <DisableableLink to="/login" disabled={true} >
        Log In
      </DisableableLink>
    </nav>
  </div>
)

export default HeaderNavBar
