import React, { useState, useEffect, useRef } from 'react'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import CurrentWeatherDisplay from '../components/CurrentWeatherDisplay'
import ChargingIndicator from '../components/ChargingIndicator'
import Header4 from '../components/Header4'
import Loading from '../components/loading/'
import DashboardSection from '../components/DashboardSection'
import LineBarChart from '../components/charts/LineBarChart'

import { connectToServerSideEvent } from '../hooks/'

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

/**
JS Docs - insta documentation
* turns on the spinner
* @param {object} config
* @param {lat: Number}

*/
  const setRefresh = config => {
    intervalRef.current = setInterval( () => refreshDashboard(config), 5 * 60 * 1000)
  }

  const getInitDashboard = () => {

    setLoading(true)
    const body = JSON.stringify({id: projectId})
    singleRequest('/get_dashboard_config', getRequest('POST', body))
      .then(parseResponse)
      .then( res => {
        console.log('res:', res);
        setLoading(false)
        // setWeather(res.weather)
        setConfig(res.config)
        // setPrices(res.prices)
        // setStateOfCharge(null)
        // setRefresh(res.config)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error retrieving your project: ${err}`)
      })
  }

  const handleData = e => {
    // TODO Check origin in production and dev per https://html.spec.whatwg.org/multipage/web-messaging.html#authors
    console.log('data from sse:', e);
    // const {
    //   weather,
    //   prices,
    // } = JSON.parse(e.data)
    // setData(JSON.parse(e.data))
  }

  const sseRoute = `/get_roi/${projectId}`

  connectToServerSideEvent(sseRoute, handleData)

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

    <ProjectPageTemplate
      title={config ? `${config.projectName} - Dashboard` : 'Project Dashboard'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
      <div style={styles.root}>
        {
          (prices && config) &&
          <ChargingIndicator
            prices={prices}
            timeZone={config.timeZone}
            chargeThreshold={config.chargeThreshold}
            dischargeThreshold={config.dischargeThreshold}
            />
        }
        {
          (prices && config) &&
          <DashboardSection headerContent={'Last Hour'}>
            <LineBarChart
              barKey={'lmp'}
              negBarThreshold={config.chargeThreshold}
              posBarThreshold={config.dischargeThreshold}
              data={prices}
              timeZone={config.timeZone}
              aspect={4}
              />
          </DashboardSection>
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
  )
}

const styles = {
  root: {
    textAlign: 'left',
  },
  chart: {
    padding: '1em 0',
  }
}

export default ProjectDashboard
