import React from 'react'
import PropTypes from 'prop-types'

import SubPageHeader from './SubPageHeader'
import { colors } from '../config/styles'

const SubPageTemplate = ({title, children}) => (

  <div style={styles.root}>
    <SubPageHeader title={title} />
    <div style={styles.content}>
      {children}
    </div>
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
    padding: '1em 0',
    margin: '0 0 auto',
  }
}

SubPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node,
}

export default SubPageTemplate
