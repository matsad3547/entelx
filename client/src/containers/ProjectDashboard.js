import React, {useState, useEffect} from 'react'

import SubPageTemplate from '../components/SubPageTemplate'
import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Header3 from '../components/Header3'
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
        <div>
          <div style={styles.header}>
            <Header3 content="Last Hour" />
          </div>
        </div>
        <div>
          <div style={styles.header}>
            <Header4 content="Weather" />
          </div>
          <a
            style={styles.ds}
            className="ds"
            target="_blank"
            href="https://darksky.net/poweredby/">
            Powered by Dark Sky
          </a>
        </div>
        <div>
          <div style={styles.header}>
            <Header4 content="Charge Status" />
          </div>
        </div>
      </ProjectPageTemplate>
    </SubPageTemplate>
  )
}

const styles = {
  header: {
    padding: '0 1em 2em',
  },
  ds: {
    color: '#0BA8F7',
    textDecoration: 'none',
  }
}

export default ProjectDashboard
