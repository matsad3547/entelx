import React, {useState, useEffect} from 'react'

import SubPageTemplate from '../components/SubPageTemplate'
import ProjectPageTemplate from '../components/ProjectPageTemplate'
import DashboardChart from '../components/DashboardChart'
import Loading from '../components/loading/'

import { getBaseUrl } from '../utils/'

import {
  singleRequest,
  parseResponse,
  getRequest,
} from '../utils/requestUtils'

const LastThreeWeeks = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'last_3_weeks', projectId)

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

    <SubPageTemplate title={'Last Three Weeks'}>
      { loading && <Loading message={''} />}
      <ProjectPageTemplate
        baseUrl={cleanUrl}
        id={projectId}
        >
        {
          (timeSeries && config) &&
          <DashboardChart
            prices={timeSeries}
            timeZone={config.timeZone}
            />
        }
      </ProjectPageTemplate>
    </SubPageTemplate>
  )
}

// const styles = {
// }

export default LastThreeWeeks
