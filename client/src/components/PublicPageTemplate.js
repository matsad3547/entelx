import React from 'react'
import PropTypes from 'prop-types'

import Footer from './Footer'
import PublicPageHeader from './PublicPageHeader'
import { colors } from '../config/'

const PublicPageTemplate = ({title, children}) => (

  <div style={styles.root}>
    <PublicPageHeader title={title} />
    <div style={styles.content}>
      {children}
    </div>
    <Footer />
  </div>
)

const styles = {
  root: {
    color: colors.text,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  content: {
    margin: '0 0 auto',
  }
}

PublicPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node,
}

export default PublicPageTemplate
