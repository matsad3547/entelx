import React from 'react'
import PropTypes from 'prop-types'

import ProjectPageHeader from './ProjectPageHeader'

const ProjectPageTemplate = ({
  title,
  baseUrl,
  id,
  children,
  showMenu = true,
}) => (

  <React.Fragment>
    <ProjectPageHeader
      title={title}
      baseUrl={baseUrl}
      id={id}
      showMenu={showMenu}
      />
    <div style={styles.root}>
      <div></div>
      <div>
        {children}
      </div>
    </div>
  </React.Fragment>
)

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 90% auto',
  }
}

ProjectPageTemplate.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  hideMenu: PropTypes.bool,
}

export default ProjectPageTemplate
