import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router'

import Header4 from '../components/Header4'
import DisableableLink from '../components/DisableableLink'
import SubPageTemplate from '../components/SubPageTemplate'
import Button from '../components/button/'
import Loading from '../components/loading/'

import {
  singleRequest,
  parseResponse,
  getRequest,
} from '../utils/requestUtils'

const Project = ({match, history}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const [loading, setLoading] = useState(false)
  const [project, setProject] = useState(null)

  const cleanUrl = url.replace(`/project/${projectId}`, '')

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
    <SubPageTemplate title={'Project Home'}>
      { loading && <Loading message={''} />}
      <p>Project {projectId}</p>
      <div style={styles.root}>
        <nav style={styles.nav}>
          <DisableableLink to={`${cleanUrl}/roi/${params.projectId}`}>
            <Header4 content="Project ROI" />
          </DisableableLink>
          <DisableableLink to={`${cleanUrl}/dashboard/${params.projectId}`}>
            <Header4 content="Project Dashboard" />
          </DisableableLink>
        </nav>
        <Button
          value={'DELETE PROJECT'}
          type="danger"
          onClick={onDelete}
          />
      </div>
    </SubPageTemplate>
  )
}

const styles = {
  nav: {
    display: 'inline-flex',
    width: '18em',
    justifyContent: 'space-between',
    padding: '1em 3em',
  },
}

export default withRouter(Project)
