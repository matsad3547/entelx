import React from 'react'
import PropTypes from 'prop-types'

import ProjectPageHeader from './ProjectPageHeader'

const ProjectPageTemplate = ({
  title,
  baseUrl,
  id,
  children,
}) => (

  <div>
    <ProjectPageHeader
      title={title}
      baseUrl={baseUrl}
      id={id}
      />
    {children}
  </div>
)

ProjectPageTemplate.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default ProjectPageTemplate
