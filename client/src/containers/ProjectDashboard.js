import React, { useState, useEffect, useRef } from 'react'

import SubPageTemplate from '../components/SubPageTemplate'
import ProjectPageTemplate from '../components/ProjectPageTemplate'
import CurrentWeatherDisplay from '../components/CurrentWeatherDisplay'
import ChargingIndicator from '../components/ChargingIndicator'
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
  const [prices, setPrices] = useState(null)
  const [stateOfCharge, setStateOfCharge] = useState(null)
  const [config, setConfig] = useState(null)

  const intervalRef = useRef(null)

  const setRefresh = config => {
    intervalRef.current = setInterval( () => refreshDashboard(config), 5 * 60 * 1000)
  }

  const getInitDashboard = () => {

    setLoading(true)
    const body = JSON.stringify({id: projectId})
    singleRequest('/get_init_dashboard', getRequest('POST', body))
      .then(parseResponse)
      .then( res => {
        console.log('res:', res);
        setLoading(false)
        setWeather(res.weather)
        setConfig(res.config)
        setPrices(res.prices)
        setStateOfCharge(null)
        setRefresh(res.config)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error retrieving your project: ${err}`)
      })
  }

  const refreshDashboard = config => {

    console.log('refreshing...')

    const body = JSON.stringify({...config})

    singleRequest('/refresh_dashboard', getRequest('POST', body))
      .then(parseResponse)
      .then( res => {
        setWeather(res.weather)
        setPrices(res.prices)
        setStateOfCharge(null)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error refreshing your project dashboard: ${err}`)
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
            prices &&
            <ChargingIndicator
              prices={prices}
              timeZone={config.timeZone}
              />
          }
          {
            (weather && config) &&
            <CurrentWeatherDisplay
              weather={weather}
              timeZone={config.timeZone}
              />
          }
          {
            stateOfCharge &&
            <div style={styles.subSection}>
              <div style={styles.header}>
                <Header4 content="State of Charge" />
              </div>
            </div>
          }
        </div>
      </ProjectPageTemplate>
    </SubPageTemplate>
  )
}

const styles = {
  root: {
    textAlign: 'left',
  },
}

export default ProjectDashboard
