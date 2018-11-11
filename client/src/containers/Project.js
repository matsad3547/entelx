import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router'

import SubPageTemplate from '../components/SubPageTemplate'
import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Button from '../components/button/'
import Loading from '../components/loading/'

import {
  singleRequest,
  parseResponse,
  getRequest,
} from '../utils/requestUtils'

import { getBaseUrl } from '../utils/'

const Project = ({match, history}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const [loading, setLoading] = useState(false)
  const [project, setProject] = useState(null)

  const cleanUrl = getBaseUrl(url, 'project', projectId)

  const onDelete = () => {

    setLoading(true)

    const body = JSON.stringify({id: params.projectId})

    singleRequest('/delete_project', getRequest('DELETE', body))
      .then( res => {
        setLoading(false)
        history.push(`${cleanUrl}`)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error deleting your project: ${err}`)
      })
  }

  const getProject = () => {
    setLoading(true)
    const body = JSON.stringify({id: params.projectId})
    singleRequest('/get_project', getRequest('POST', body))
      .then(parseResponse)
      .then( res => {
        setProject(res[0])
        setLoading(false)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error retrieving your project: ${err}`)
      })
  }

  useEffect( () => getProject(), [])

  console.log('project?', project);

  return (
    <SubPageTemplate title={project ? `${project.name} - Home` : 'Project Home'}>
      { loading && <Loading message={''} />}
      <ProjectPageTemplate
        baseUrl={cleanUrl}
        id={projectId}
        >
        <div style={styles.root}>
          <p>Project {projectId}</p>
          <Button
            value={'DELETE PROJECT'}
            type="danger"
            onClick={onDelete}
            />
        </div>
      </ProjectPageTemplate>
    </SubPageTemplate>
  )
}

const styles = {
  root: {
  },
}

export default withRouter(Project)
