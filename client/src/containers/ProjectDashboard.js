import React from 'react'

import SubPageTemplate from '../components/SubPageTemplate'

const ProjectDashboard = ({match}) => (

  <SubPageTemplate title={'Project Dashboard'}>
    <p>Project id: {match.params.projectId}</p>
  </SubPageTemplate>
)

const styles = {
}

export default ProjectDashboard
