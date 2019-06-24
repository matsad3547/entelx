import React from 'react'

import PublicPageTemplate from './PublicPageTemplate'

import { colors } from '../config/styles'

const Contact = () => (

  <PublicPageTemplate
    title={'Contact'}
    >
    <p style={styles.text}>If you have feedback, advice, or interest in this project, please contact me either on <a href="https://twitter.com/matsad111" target="_blank" rel="noopener noreferrer" style={styles.link}>Twitter</a> or on <a  href="https://www.linkedin.com/in/matthew-sadauckas-68bb9793/" target="_blank" rel="noopener noreferrer" style={styles.link}>LinkedIn</a>.</p>
  </PublicPageTemplate>
)

const styles = {
  text: {
    padding: '1em 0',
  },
  link: {
    textDecoration: 'none',
    color: colors.middleGreen,
    fontWeight: 'bold',
  }
}

export default Contact
