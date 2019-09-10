import React from 'react'

import PublicPageTemplate from './PublicPageTemplate'

import { colors } from '../config/styles'

const Contact = () => (

  <PublicPageTemplate
    title={'Contact'}
    >
    <div style={styles.root}>
      <p style={styles.text}>As I've detailed <a  href="/about" target="_blank" rel="noopener noreferrer" style={styles.link}>here</a>, this idea of this project has be rattling around my brain for the last three years, even prior to changing careers to software development.  In fact, building something like this was among the reasons I undertook that change.</p>
      <p style={styles.text}>I would like help making it better</p>
      <p style={styles.text}>If you have feedback, advice, or interest in this project, please contact me either on <a href="https://twitter.com/matsad111" target="_blank" rel="noopener noreferrer" style={styles.link}>Twitter</a> or on <a  href="https://www.linkedin.com/in/matthew-sadauckas-68bb9793/" target="_blank" rel="noopener noreferrer" style={styles.link}>LinkedIn</a>.</p>
      <p style={styles.text}>If you would like to know more about the code behind this project, take a look <a  href="https://github.com/matsad3547/entelx" target="_blank" rel="noopener noreferrer" style={styles.link}>here</a>.</p>
    </div>
  </PublicPageTemplate>
)

const styles = {
  text: {
    textAlign: 'left',
    padding: '1em 3em',
  },
  link: {
    textDecoration: 'none',
    color: colors.middleGreen,
    fontWeight: 'bold',
  }
}

export default Contact
