import React from 'react'

import Header4 from './Header4'
import DisableableLink from './DisableableLink'

const Footer = () => (

  <div style={styles.root} >

    <DisableableLink to="/about" >
      <Header4
        content={'About'}
      />
    </DisableableLink>
    <DisableableLink to="/contact">
      <Header4
        content={'Contact'}
      />
    </DisableableLink>
  </div>
)

const styles = {
  root: {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-around',
    margin: '0 0 5em',
  },
}

export default Footer
