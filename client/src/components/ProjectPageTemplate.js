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

  <div>
    <ProjectPageHeader
      title={title}
      baseUrl={baseUrl}
      id={id}
      showMenu={showMenu}
      />
    {children}
  </div>
)

ProjectPageTemplate.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  hideMenu: PropTypes.bool,
}

export default ProjectPageTemplate
