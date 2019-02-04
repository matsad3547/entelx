import React, {useState, useEffect} from 'react'
import moment from 'moment-timezone'

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
  const [timeseries, setTimeseries] = useState(null)
  // const [aggregate, setAggregate] = useState(null)
  const [config, setConfig] = useState(null)

  const getInitTimes = () => {
    const now = moment()
    const endMillis = now.valueOf()
    const startMillis = now.clone()
                        .subtract(7, 'days')
                        .valueOf()
    return {
      endMillis,
      startMillis,
    }
  }

  const getData = (endMillis, startMillis, weather = false) => {

    const body = {
      id: projectId,
      endMillis,
      startMillis,
    }

    setLoading(true)
    singleRequest('/historical/', getRequest('POST', JSON.stringify(body)))
      .then(parseResponse)
      .then( res => {
        console.log('res:', res);
        setLoading(false)
        setConfig(res.config)
        setTimeseries(res.timeseries)
        // setAggregate(res.aggregate)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error retrieving your project: ${err}`)
      })
  }

  useEffect( () => {

    const {
      endMillis,
      startMillis,
    } = getInitTimes()

    getData(endMillis, startMillis)
  }, [])

  return (

    <ProjectPageTemplate
      title={'Last Week'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
      {
        (timeseries && config) &&
        <DashboardSection headerContent={'Last Week'}>
          <LineBarChart
            barKey={'lmp'}
            data={timeseries}
            timeZone={config.timeZone}
            aspect={3}
            />
        </DashboardSection>
      }
    </ProjectPageTemplate>
  )
}

export default HistoricalDisplay

// xRefLines={aggregate.inflections}
