import React, {useState, useEffect} from 'react'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Loading from '../components/loading/'

import { getBaseUrl } from '../utils/'

const ProjectRoi = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'roi', projectId)

  const [loading] = useState(false)
  const [data, setData] = useState(null)

  const handleData = e => {
    console.log(e);
  }

  const handleError = err => console.log('error:', err);

  useEffect( () => {
    const stream = new EventSource(`/get_roi/${projectId}`)

    stream.addEventListener('message', handleData)

    stream.addEventListener('error', handleError)

    return () => {
      stream.removeEventListener('message', handleData)
      stream.addEventListener('error', handleError)
      stream.close()
    }
  }, [])

  return (
    <ProjectPageTemplate
      title={'Project Return on Investment'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
      <p>Project id: {projectId}</p>
    </ProjectPageTemplate>
  )
}

// const styles = {
//
// }

export default ProjectRoi
