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

// const styles = {
//   root: {
//     textAlign: 'right',
//   },
//   nav: {
//     display: 'inline-flex',
//     width: '13em',
//     justifyContent: 'space-between',
//     padding: '1em 3em',
//   },
// }

export default HeaderNavBar
