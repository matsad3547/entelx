import React from 'react'
import PropTypes from 'prop-types'

import ProjectNav from './ProjectNav'

const ProjectPageTemplate = ({
  baseUrl,
  id,
  children,
}) => (

  <div style={styles.root}>
    <ProjectNav
      baseUrl={baseUrl}
      id={id}
      />
    <div style={styles.content}>
      {children}
    </div>
  </div>
)

const styles = {
  root: {
    minHeight: '95vh',
    display: 'flex',
  },
  content: {
    padding: '1em 0',
    margin: '0 0 auto',
    width: '100%',
  },
}

ProjectPageTemplate.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default ProjectPageTemplate
