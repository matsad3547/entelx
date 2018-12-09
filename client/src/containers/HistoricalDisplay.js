import React, {useState, useEffect} from 'react'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Loading from '../components/loading/'
import DashboardSection from '../components/DashboardSection'
import LineBarChart from '../components/charts/LineBarChart'

import { getBaseUrl } from '../utils/'

import {
  singleRequest,
  parseResponse,
  getRequest,
} from '../utils/requestUtils'

const HistoricalDisplay = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'historical', projectId)

  const [loading, setLoading] = useState(false)
  const [timeSeries, setTimeSeries] = useState(null)
  const [aggregate, setAggregate] = useState(null)
  const [config, setConfig] = useState(null)

  const getData = () => {

    setLoading(true)
    const body = JSON.stringify({id: projectId})
    singleRequest('/get_3_week_data', getRequest('POST', body))
      .then(parseResponse)
      .then( res => {
        console.log('res:', res);
        setLoading(false)
        setConfig(res.config)
        setTimeSeries(res.timeSeries)
        setAggregate(res.aggregate)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error retrieving your project: ${err}`)
      })
  }

  useEffect( () => {
    getData()
  }, [])

  return (

    <ProjectPageTemplate
      title={'Last Week'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
      {
        (timeSeries && config && aggregate) &&
        <DashboardSection headerContent={'Last Week'}>
          <LineBarChart
            barKey={'lmp'}
            data={timeSeries}
            timeZone={config.timeZone}
            xRefLines={aggregate.inflections}
            aspect={2}
            />
        </DashboardSection>
      }
    </ProjectPageTemplate>
  )
}

export default HistoricalDisplay
