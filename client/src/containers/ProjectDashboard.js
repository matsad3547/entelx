import React, {useState, useEffect} from 'react'

import SubPageTemplate from '../components/SubPageTemplate'
import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Header4 from '../components/Header4'
import Loading from '../components/loading/'

import { getBaseUrl } from '../utils/'

import {
  singleRequest,
  parseResponse,
  getRequest,
} from '../utils/requestUtils'

const ProjectDashboard = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'dashboard', projectId)

  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState(null)
  const [config, setConfig] = useState(null)

  const getInitDashboard = () => {
    setLoading(true)
    const body = JSON.stringify({id: projectId})
    singleRequest('/get_dashboard', getRequest('POST', body))
      .then(parseResponse)
      .then( res => {
        console.log('res:', res);
        setWeather(res.weather)
        setConfig(res.config)
        setLoading(false)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error retrieving your project: ${err}`)
      })
  }

  useEffect( () => getInitDashboard(), [])

  return (

    <SubPageTemplate title={config ? `${config.projectName} - Dashboard` : 'Project Dashboard'}>
      { loading && <Loading message={''} />}
      <ProjectPageTemplate
        baseUrl={cleanUrl}
        id={projectId}
        >
        <div style={styles.root}>
          {/*<div style={styles.header}>
            <Header3 content="Last Hour" />
          </div>*/}
          <div style={styles.subSection}>
            <div style={styles.header}>
              <Header4 content="Weather" />
            </div>
            <div>

            </div>
            <div style={styles.link}>
              <a
                style={styles.ds}
                target="_blank"
                rel="noopener noreferrer"
                href="https://darksky.net/poweredby/">
                Powered by Dark Sky
              </a>
            </div>
          </div>
          <div style={styles.subSection}>
            <div style={styles.header}>
              <Header4 content="State of Charge" />
            </div>
          </div>
        </div>
      </ProjectPageTemplate>
    </SubPageTemplate>
  )
}

const styles = {
  root: {
    textAlign: 'left',
  },
  header: {
    padding: '0 2em 1em',
  },
  subSection: {
    textAlign: 'left',
    padding: '0 1em',
  },
  link: {
    textAlign: 'right',
  },
  ds: {
    color: '#0BA8F7',
    textDecoration: 'none',
    fontSize: '.8em',
    textAlign: 'right',
  }
}

export default ProjectDashboard
