import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router'

import SubPageTemplate from '../components/SubPageTemplate'
import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Header4 from '../components/Header4'
import Button from '../components/button/'
import Loading from '../components/loading/'

import {
  singleRequest,
  parseResponse,
  getRequest,
} from '../utils/requestUtils'

import { getBaseUrl } from '../utils/'

import { colors } from '../config/styles'

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
          <div style={styles.header}>
            <Header4 content="Project Specifications" />
          </div>
          {
            project &&
            <div style={styles.specs}>
              <span style={styles.label}>
                Power
              </span>
              <p style={styles.data}>
                {`${project.power} Mw`}
              </p>
              <span style={styles.label}>
                Energy
              </span>
              <p style={styles.data}>
                {`${project.energy} Mwh`}
              </p>
              <span style={styles.label}>
                Location
              </span>
              {
                project.address ?
                <p style={styles.data}>
                  {`${project.address} - ${project.city} -  ${project.state}`}
                </p>
                :
                <p style={styles.data}>
                  {`${project.lat} `}
                  <span style={styles.label}>
                    latitude
                  </span>
                  {`,  ${project.lng} `}
                  <span style={styles.label}>
                    longitude
                  </span>
                </p>
              }
            </div>
          }
          <div style={styles.button}>
            <Button
              value={'DELETE PROJECT'}
              type="danger"
              onClick={onDelete}
              />
          </div>
        </div>
      </ProjectPageTemplate>
    </SubPageTemplate>
  )
}

const styles = {
  root: {
    textAlign: 'left',
    padding: '0 1em',
  },
  header: {
    padding: '0 1em 2em',
  },
  specs: {
    padding: '0 2em',
  },
  label: {
    fontSize: '.9em',
    padding: '1em 0',
    fontStyle: 'italic',
    color: colors.gray,
  },
  data: {
    padding: '1em',
  },
  button: {
    padding: '0 1em',
  },
}

export default withRouter(Project)
