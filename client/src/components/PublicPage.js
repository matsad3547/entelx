import React from 'react'
import PropTypes from 'prop-types'

import Footer from './Footer'
import PageHeader from './PageHeader'
import { colors } from '../config/styles'

const PublicPage = ({title, children}) => (

  <div style={styles.root}>
    <PageHeader title={title} />
    <div style={styles.content}>{children}</div>
    <Footer />
  </div>
)

const styles = {
  root: {
    minHeight: '95vh',
    display: 'flex',
    flexDirection: 'column',
    color: colors.text,
  },
  content: {
    padding: '1em',
    margin: '0 0 auto',
  }
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node,
}

export default PublicPage
