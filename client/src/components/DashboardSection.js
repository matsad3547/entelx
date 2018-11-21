import React from 'react'
import PropTypes from 'prop-types'

import Header4 from '../components/Header4'

const DashboardSection = ({
  headerContent,
  children,
}) => (

  <div style={styles.root}>
    <div style={styles.header}>
      <Header4 content={headerContent} />
    </div>
    <div style={styles.data}>
      {children}
    </div>
  </div>
)

const styles = {
  root: {
    textAlign: 'left',
    padding: '0 2em 2em',
  },
  header: {
    padding: '0 0 1em',
  },
  data: {
    padding: '0 1em',
  },
}

DashboardSection.propTypes = {
  headerContent: PropTypes.string,
}

export default DashboardSection