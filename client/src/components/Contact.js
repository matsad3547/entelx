import React from 'react'

import Footer from './Footer'
import { colors } from '../config/styles'

const Contact = () => (

  <div style={styles.root}>
    <h1>Contact</h1>
    <p style={styles.text}>Coming soon!</p>
    <Footer />
  </div>
)

const styles = {
  root: {
    height: '95vh',
    display: 'flex',
    flexDirection: 'column',
    color: colors.text,
  },
  text: {
    padding: '1em',
    margin: '0 0 auto',
  }
}

export default Contact
