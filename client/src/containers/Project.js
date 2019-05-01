import React, {useState, useEffect, useCallback} from 'react'
import { withRouter } from 'react-router'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Header4 from '../components/Header4'
import Label from '../components/Label'
import DataDisplay from '../components/DataDisplay'
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

    singleRequest(`/project/${projectId}`, getRequest('DELETE'))
      .then( res => {
        setLoading(false)
        history.push(`${cleanUrl}`)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error deleting your project: ${err}`)
      })
  }

  const getProject = useCallback(() => {
    setLoading(true)
    singleRequest(`/project/${projectId}`, getRequest('GET'))
      .then(parseResponse)
      .then( res => {
        setProject(res[0])
        setLoading(false)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error retrieving your project: ${err}`)
      })
  }, [projectId])

  useEffect( () => getProject(), [getProject])

  return (
    <ProjectPageTemplate
      title={project ? `${project.name} - Home` : 'Project Home'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
      <div style={styles.root}>
        <div style={styles.header}>
          <Header4 content="Project Specifications" />
        </div>
        {
          project &&
          <div style={styles.specs}>
            <Label content="Power"/>
            <DataDisplay content={`${project.power} Mw`}/>
            <Label content="Energy"/>
            <DataDisplay content={`${project.energy} Mwh`}/>
            <Label content="Round Trip Efficiency"/>
            <DataDisplay content={`${project.rte * 100}%`}/>
            <Label content="Location"/>
            {
              project.address ?
              <DataDisplay content={`${project.address} - ${project.city} -  ${project.state}`}/>
              :
              <div style={styles.latLng}>
                <DataDisplay content={project.lat}/>
                <Label content="latitude"/>
                <DataDisplay content={project.lng}/>
                <Label content="longitude"/>
              </div>
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
  latLng: {
    display: 'inline-flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    width: '22em',
  },
  button: {
    padding: '0 1em',
  },
}

export default withRouter(Project)
