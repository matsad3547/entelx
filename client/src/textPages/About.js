import React from 'react'

import PublicPageTemplate from '../components/PublicPageTemplate'

const About = () => (

  <PublicPageTemplate
    title={'About'}
    >
    <p style={styles}>This project is the work of Matt Sadauckas.  Motivated, knowledgeable collaborators and critical feedback sought!</p>
  </PublicPageTemplate>
)

const styles = {
  padding: '1em 0',
}

export default About
