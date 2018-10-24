import React from 'react'

import Footer from './Footer'

const About = () => (

  <div style={styles.root}>
    <h1>About</h1>
    <p style={styles.text}>This project is the work of Matt Sadauckas.  Motivated, knowledgeable collaborators and critical feedback sought!</p>
    <Footer />
  </div>
)

const styles = {
  root: {
    height: '95vh',
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    padding: '1em',
    margin: '0 0 auto',
  }
}

export default About
