import React, {useState} from 'react'

import SubPageTemplate from '../components/SubPageTemplate'
import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Loading from '../components/loading/'

import { getBaseUrl } from '../utils/'

const LastThreeWeeks = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'last_3_weeks', projectId)

  const [loading] = useState(false)

  return (

    <SubPageTemplate title={'Last Three Weeks'}>
      { loading && <Loading message={''} />}
      <ProjectPageTemplate
        baseUrl={cleanUrl}
        id={projectId}
        >
        <p>Project id: {projectId}</p>
      </ProjectPageTemplate>
    </SubPageTemplate>
  )
}

// const styles = {
// }

export default LastThreeWeeks
