import React, { useState, useCallback } from 'react'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import CurrentWeatherDisplay from '../components/CurrentWeatherDisplay'
import Status from '../components/Status'
import Loading from '../components/loading/'
import DashboardSection from '../components/DashboardSection'
import LineBarChart from '../components/charts/LineBarChart'

import { useConnectToServerSideEvent } from '../hooks/'

import { getBaseUrl } from '../utils/'

import { useGetProject } from '../hooks/'

const ProjectDashboard = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'dashboard', projectId)

  const [project, loadingProject] = useGetProject(projectId)

  const [weather, setWeather] = useState(null)
  const [prices, setPrices] = useState(null)
  const [revenue, setRevenue] = useState(null)
  const [charge, setCharge] = useState(null)
  const [chargeThreshold, setChargeThreshold] = useState(null)
  const [dischargeThreshold, setDischargeThreshold] = useState(null)
  const [status, setStatus] = useState('standby')

/**
JS Docs - insta documentation
* turns on the spinner
* @param {object} config
* @param {lat: Number}
*/

  const handleData = useCallback( e => {
    e.preventDefault()
    const {
      weather,
      prices,
      revenue,
      charge,
      status,
      chargeThreshold,
      dischargeThreshold,
    } = JSON.parse(e.data)

    setWeather(weather)
    setPrices(prices)
    setRevenue(revenue)
    setCharge(charge)
    setStatus(status)
    setChargeThreshold(chargeThreshold)
    setDischargeThreshold(dischargeThreshold)
  }, [])

  const sseRoute = `/dashboard/${projectId}`

  useConnectToServerSideEvent(sseRoute, handleData)

  const hasPrices = prices && prices.length > 0

  return (

    <ProjectPageTemplate
      title={project ? `${project.name} - Dashboard` : 'Project Dashboard'}
      baseUrl={cleanUrl}
      id={projectId}
      >

      {/*{ loadingProject && <Loading message={''} />}*/}
      { true && <Loading message={''} />}
      <div style={styles.root}>
        <Status
          config={{
            ...project,
            chargeThreshold,
            dischargeThreshold,
          }}
          prices={prices}
          charge={charge}
          revenue={revenue}
          status={status}
          />
        <DashboardSection headerContent={'Last Hour'}>
        {
          (hasPrices && project) ?
            <LineBarChart
              barKey={'lmp'}
              negBarThreshold={chargeThreshold}
              posBarThreshold={dischargeThreshold}
              data={prices}
              timeZone={project.timeZone}
              aspect={4}
              /> :
            <p style={styles.noData}>Data for the last hour is not currently available</p>
        }
        </DashboardSection>
        {
          project &&
          <CurrentWeatherDisplay
            weather={weather}
            timeZone={project.timeZone}
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
