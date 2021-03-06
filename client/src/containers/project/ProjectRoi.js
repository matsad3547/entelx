import React, { useState, useCallback } from 'react'

import ProjectPageTemplate from '../../components/projectPageTemplate/'
import Loading from '../../components/loading/'

import { useConnectToServerSideEvent } from '../../hooks/'

import { getBaseUrl } from '../../utils/'

const ProjectRoi = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'roi', projectId)

  const [loading] = useState(false)
  const [data, setData] = useState(null)

  const handleData = useCallback( e => {
    // TODO Check origin in production and dev per https://html.spec.whatwg.org/multipage/web-messaging.html#authors
    console.log(e);
    setData(JSON.parse(e.data))
  }, [])

  const sseRoute = `/roi/${projectId}`

  useConnectToServerSideEvent(sseRoute, handleData)

  return (
    <ProjectPageTemplate
      title={'Project Return on Investment'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
      <p>Project id: {projectId}</p>
      {
        data &&
        <p>{data.cheese}</p>
      }
    </ProjectPageTemplate>
  )
}

// const styles = {
//
// }

export default ProjectRoi
