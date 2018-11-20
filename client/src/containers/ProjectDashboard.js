import React, { useState, useEffect, useRef } from 'react'

import SubPageTemplate from '../components/SubPageTemplate'
import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Header4 from '../components/Header4'
import Label from '../components/Label'
import DataDisplay from '../components/DataDisplay'
import Loading from '../components/loading/'

import {
  getBaseUrl,
  roundToDigits,
} from '../utils/'

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

  const intervalRef = useRef(null)

  const setRefresh = () => {
    intervalRef.current = setInterval( () =>
    { console.log('doing the thing!')}, 5 * 60 * 1000)
  }

  const getInitDashboard = () => {
    setLoading(true)
    const body = JSON.stringify({id: projectId})
    singleRequest('/get_dashboard', getRequest('POST', body))
      .then(parseResponse)
      .then( res => {
        console.log('res:', res);
        setLoading(false)
        setWeather(res.weather)
        setConfig(res.config)
        setRefresh()
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error retrieving your project: ${err}`)
      })
  }

  useEffect( () => {
    getInitDashboard()
    return () => clearInterval(intervalRef.current)
  }, [])

  return (

    <SubPageTemplate title={config ? `${config.projectName} - Dashboard` : 'Project Dashboard'}>
      { loading && <Loading message={''} />}
      <ProjectPageTemplate
        baseUrl={cleanUrl}
        id={projectId}
        >
        <div style={styles.root}>
          {
            weather &&
            <div style={styles.subSection}>
              <div style={styles.header}>
                <Header4 content="Weather" />
              </div>
              <div style={styles.data}>
                <Label content="Current Temperature"/>
                <DataDisplay content={`${roundToDigits(weather.temperature, 1)}°F`}/>
                <Label content="Cloud Cover"/>
                <DataDisplay content={`${roundToDigits(weather.cloudCover * 100, 0)} %`}/>
                <Label content="Wind"/>
                <DataDisplay content={`${roundToDigits(weather.windSpeed, 1)} mph gusting to ${roundToDigits(weather.windGust, 1)} mph, bearing ${weather.windBearing}°`}/>
                <Label content="Nearest Storm"/>
                <DataDisplay content={`${weather.nearestStormDistance} mi bearing ${weather.nearestStormBearing}°`}/>
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
          }
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
  data: {
    padding: '0 3em',
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
