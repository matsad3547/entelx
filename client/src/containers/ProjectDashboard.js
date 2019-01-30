import React, { useState, useEffect } from 'react'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import CurrentWeatherDisplay from '../components/CurrentWeatherDisplay'
import Status from '../components/Status'
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
  const [revenue, setRevenue] = useState(null)
  const [soc, setSoc] = useState(null)
  const [config, setConfig] = useState(null)

/**
JS Docs - insta documentation
* turns on the spinner
* @param {object} config
* @param {lat: Number}

*/

  const getInitDashboard = () => {

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
  }

  const handleData = e => {
    e.preventDefault()
    const {
      weather,
      prices,
      revenue,
      soc,
    } = JSON.parse(e.data)

    setWeather(weather)
    setPrices(prices)
    setRevenue(revenue)
    setSoc(soc)
  }

  const sseRoute = `/dashboard/${projectId}/data`

  connectToServerSideEvent(sseRoute, handleData)

  useEffect( () => {
    getInitDashboard()
  }, [])

  const hasPrices = prices && prices.length > 0

  const dataLoaded = loading && !hasPrices

  const hasSoc = soc !== null && revenue !== null


  return (

    <ProjectPageTemplate
      title={config ? `${config.projectName} - Dashboard` : 'Project Dashboard'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { dataLoaded && <Loading message={''} />}
      <div style={styles.root}>
        {
          (hasPrices && config && hasSoc) &&
          <Status
            prices={prices}
            timeZone={config.timeZone}
            chargeThreshold={config.chargeThreshold}
            dischargeThreshold={config.dischargeThreshold}
            soc={soc}
            revenue={revenue}
            />
        }
        {
          (hasPrices && config) &&
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
