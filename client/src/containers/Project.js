import React, {useState} from 'react'
import { withRouter } from 'react-router'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Header4 from '../components/Header4'
import Label from '../components/Label'
import DataDisplay from '../components/DataDisplay'
import Button from '../components/button/'
import Loading from '../components/loading/'

import Map from './map/Map'
import MapMarkerRenderer from '../components/map/MapMarkerRenderer'

import {
  singleRequest,
} from '../utils/requestUtils'

import { getBaseUrl } from '../utils/'
import { defaultHeaders } from '../config'

import { useGetProject } from '../hooks/'

const Project = ({match, history}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const [loading, setLoading] = useState(false)

  const [project, loadingProject] = useGetProject(projectId)

  const cleanUrl = getBaseUrl(url, 'project', projectId)

  const onDelete = () => {

    setLoading(true)

    const request = {
      method: 'DELETE',
      headers: defaultHeaders,
    }

    singleRequest(`/project/${projectId}`, request)
      .then( res => {
        setLoading(false)
        history.push(`${cleanUrl}`)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error deleting your project: ${err}`)
      })
  }

  return (
    <ProjectPageTemplate
      title={project ? `${project.name} - Home` : 'Project Home'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      <div style={styles.root}>
        { (loading || loadingProject) && <Loading message={''} />}

        <div style={styles.project}>
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
              width={'12em'}
              />
          </div>
        </div>
        <div style={styles.mapContainer}>
          {
            project &&
            <Map
              center={[project.lng, project.lat]}
              zoom={8}
              style={styles.map}
              >
              <MapMarkerRenderer
                lat={project.lat}
                lng={project.lng}
                />
            </Map>
          }
        </div>
      </div>
    </ProjectPageTemplate>
  )
}

const styles = {
  root: {
    display: 'flex',
  },
  project: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    padding: '0 1em',
    flex: '1 1 48%',
  },
  header: {
    padding: '0 1em 2em',
  },
  specs: {
    padding: '0 2em 1em',
  },
  latLng: {
    display: 'inline-flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    width: '24em',
  },
  button: {
    padding: '0 1em',
  },
  map: {
    height: '100%',
  },
  mapContainer: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    padding: '0 2em',
    height: '30em',
    flex: '1 1 48%',
  },
}

export default withRouter(Project)
