import React from 'react'

import SubPageTemplate from '../components/SubPageTemplate'

const ProjectRoi = ({match}) => {

  return (
    <SubPageTemplate title={'Project Return on Investment'}>
      <p>Project id: {match.params.projectId}</p>
    </SubPageTemplate>
  )
}

// const styles = {
// }

export default ProjectRoi
