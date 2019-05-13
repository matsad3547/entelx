import React, { useState, useEffect, useCallback } from 'react'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import CurrentWeatherDisplay from '../components/CurrentWeatherDisplay'
import Status from '../components/Status'
import Loading from '../components/loading/'
import DashboardSection from '../components/DashboardSection'
import LineBarChart from '../components/charts/LineBarChart'

import { useConnectToServerSideEvent } from '../hooks/'

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
  const [revenue, setRevenue] = useState(null)
  const [charge, setCharge] = useState(null)
  const [status, setStatus] = useState('standby')
  const [config, setConfig] = useState(null)

/**
JS Docs - insta documentation
* turns on the spinner
* @param {object} config
* @param {lat: Number}
*/

  const getInitDashboard = useCallback(() => {

    setLoading(true)
    singleRequest(`/dashboard/${projectId}/config`, getRequest('GET'))
      .then(parseResponse)
      .then( res => {
        console.log('res:', res);
        setLoading(false)
        setConfig(res.config)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error retrieving your project: ${err}`)
      })
  }, [projectId])

  const handleData = useCallback( e => {
    e.preventDefault()
    const {
      weather,
      prices,
      revenue,
      charge,
      status,
    } = JSON.parse(e.data)

    setWeather(weather)
    setPrices(prices)
    setRevenue(revenue)
    setCharge(charge)
    setStatus(status)
  }, [])

  const sseRoute = `/dashboard/${projectId}/data`

  useConnectToServerSideEvent(sseRoute, handleData)

  useEffect( () => {
    getInitDashboard()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  const hasPrices = prices && prices.length > 0

  const dataLoaded = loading && !hasPrices

  return (

    <ProjectPageTemplate
      title={config ? `${config.projectName} - Dashboard` : 'Project Dashboard'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { dataLoaded && <Loading message={''} />}
      <div style={styles.root}>
        <Status
          config={config}
          prices={prices}
          charge={charge}
          revenue={revenue}
          status={status}
          />
        <DashboardSection headerContent={'Last Hour'}>
        {
          (hasPrices && config) ?
            <LineBarChart
              barKey={'lmp'}
              negBarThreshold={config.chargeThreshold}
              posBarThreshold={config.dischargeThreshold}
              data={prices}
              timeZone={config.timeZone}
              aspect={4}
              /> :
            <p style={styles.noData}>Data for the last hour is not currently available</p>
        }
        </DashboardSection>
        {
          config &&
          <CurrentWeatherDisplay
            weather={weather}
            timeZone={config.timeZone}
            />
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
  },
  noData: {
    padding: '0 1em',
  },
}

export default ProjectDashboard
