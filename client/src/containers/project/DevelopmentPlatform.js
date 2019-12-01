import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'

import ProjectPageTemplate from '../../components/ProjectPageTemplate'
import Loading from '../../components/loading/'
import Button from '../../components/button/'
import DashboardSection from '../../components/DashboardSection'
// import DateControl from '../components/DateControl'
// import TimeIncrementSelect from '../components/TimeIncrementSelect'
// import LabeledCheckbox from '../components/LabeledCheckbox'
// import DataTimeDisplay from '../components/DataTimeDisplay'
import ValueControl from '../../components/ValueControl'

import Label from '../../components/Label'
import DataDisplay from '../../components/DataDisplay'
import ThreeDimensionalChart from '../../components/charts/ThreeDimensionalChart'

import {
  getBaseUrl,
  roundToDigits,
} from '../../utils/'

import { singleRequest } from '../../utils/requestUtils'

// import {timeIncrements} from '../config/'
//
// import { useConnectToServerSideEvent } from '../hooks/'

import { formatDollars } from '../../utils/'

import {
  blankDollars,
  defaultHeaders,
} from '../../config/'

import { useGetProject } from '../../hooks/'

const DevelopmentPlatform = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'dev', projectId)

  const getNow = () => moment()

  const now = getNow()
  // const oneWeekAgo = now.clone()
    .subtract(7, 'days')
  const oneWeekAgo = now.clone()
    .subtract(7, 'days')

  const [project, loadingProject] = useGetProject(projectId, cleanUrl)

  const [startTime] = useState(oneWeekAgo)
  const [endTime] = useState(now)

  const [chargeThreshold, setChargeThreshold] = useState(0)
  const [chargeStdDev, setChargeStdDev] = useState(0)

  const [dischargeThreshold, setDischargeThreshold] = useState(0)
  const [dischargeStdDev, setDischargeStdDev] = useState(0)

  const [multiplier] = useState(.1)
  const [loading, setLoading] = useState(false)
  const [revenueSurface, setRevenueSurface] = useState(null)
  const [aggregate, setAggregate] = useState(null)
  const [revenue, setRevenue] = useState(0)

  const onIncrement = (value, increment) => value + increment

  const onDecrement = (value, increment) => value - increment

  const onIncrementChargeThreshold = () => {
    const incremented = onIncrement(chargeThreshold, chargeStdDev * multiplier)

    setChargeThreshold(incremented)
  }

  const onDecrementChargeThreshold = () => {
    const decremented = onDecrement(chargeThreshold, chargeStdDev * multiplier)

    setChargeThreshold(decremented)
  }

  const onIncrementDischargeThreshold = () => {
    const incremented = onIncrement(dischargeThreshold, dischargeStdDev * multiplier)

    setDischargeThreshold(incremented)
  }

  const onDecrementDischargeThreshold = () => {
    const decremented = onDecrement(dischargeThreshold, dischargeStdDev * multiplier)

    setDischargeThreshold(decremented)
  }

  const getRevenueSurface = useCallback( async () => {

    const startDate = startTime.toISOString()
    const endDate = endTime.toISOString()

    const request = {
      method: 'GET',
      headers: defaultHeaders,
    }

    setLoading(true)

    try {
      const res = await singleRequest(`/revenue_surface/${projectId}/${startDate}/${endDate}`, request)

      const parsed = await res.json()

      setRevenueSurface(parsed.revenueSurface)
    }
    catch (err) {
      console.error(`There was an error calculating revenue surface data for your project: ${err}`)
    }
    finally {
      setLoading(false)
    }
  }, [startTime, endTime, projectId])

  const getData = useCallback( async () => {

    const startDate = startTime.toISOString()
    const endDate = endTime.toISOString()

    const request = {
      method: 'GET',
      headers: defaultHeaders,
    }

    setLoading(true)

    try {
      const res = await singleRequest(`/insights/${projectId}/${startDate}/${endDate}`, request)

      const { aggregate } = await res.json()

      setAggregate(aggregate)

      const {
        belowMean,
        belowStdDev,
        aboveMean,
        aboveStdDev,
      } = aggregate

      setChargeThreshold(belowMean)
      setChargeStdDev(belowStdDev)
      setDischargeThreshold(aboveMean)
      setDischargeStdDev(aboveStdDev)
    }
    catch (err) {
      console.error(`There was an error retrieving your project: ${err}`)
    }
    finally {
      setLoading(false)
    }
  }, [startTime, endTime, projectId])

  const getTest = useCallback( async () => {

    console.log('project:', project);

    const request = {
      method: 'GET',
      headers: defaultHeaders,
    }

    setLoading(true)

    try {
      const res = await singleRequest(`/test/${project.nodeId}`, request)

      const response = await res.json()

      console.log('test response:', response);
    }
    catch (err) {
      console.error(`There was an error running the test function: ${err}`)
    }
    finally {
      setLoading(false)
    }
  }, [project])

  const getRevenue = useCallback( async () => {

    const request = {
      method: 'GET',
      headers: defaultHeaders,
    }

    setLoading(true)

    try {
      const res = await singleRequest(`/revenue_by_thresholds/${projectId}/${chargeThreshold}/${dischargeThreshold}`, request)

      const parsed = await res.json()

      setRevenue(parsed.revenue)
    }
    catch (err) {
      console.error(`There was an error retrieving revenue data: ${err}`)
    }
    finally {
      setLoading(false)
    }
  }, [chargeThreshold, dischargeThreshold, projectId])

  useEffect( () => {
    getData()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (

    <ProjectPageTemplate
      title={'Development Platform'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { (loading || loadingProject) && <Loading message={''} />}
      <DashboardSection
        headerContent={'Test Charge and Discharge Thresholds'}>
        {
          aggregate &&
          <div style={styles.revenue}>
            <div style={styles.revenueDisplay}>
              <Label content="7 Day Revenue for Selected Thresholds:"/>
              <DataDisplay content={`${revenue ? formatDollars(revenue) : blankDollars}`}/>
            </div>
            <div style={styles.revenueWrapper}>
              <div style={styles.controls}>
                <div>
                  <ValueControl
                    value={chargeThreshold || (project && project.chargeThreshold)}
                    format={formatDollars}
                    title="Charge Threshold"
                    disabled={project && !project.chargeThreshold}
                    onIncrement={onIncrementChargeThreshold}
                    onDecrement={onDecrementChargeThreshold}
                    onIncrementLabel={`${multiplier}\u03C3`}
                    onDecrementLabel={`${multiplier}\u03C3`}
                    width={'18em'}
                    />
                  <p style={styles.thresholds}>
                    {`Charge Threshold is ${roundToDigits((aggregate.belowMean - chargeThreshold)/aggregate.belowStdDev, 2)} x \u03C3 below the mean`}
                  </p>
                </div>
                <div>
                  <ValueControl
                    value={dischargeThreshold || (project && project.dischargeThreshold)}
                    format={formatDollars}
                    title="Discharge Threshold"
                    disabled={project && !project.dischargeThreshold}
                    onIncrement={onIncrementDischargeThreshold}
                    onDecrement={onDecrementDischargeThreshold}
                    onIncrementLabel={`${multiplier}\u03C3`}
                    onDecrementLabel={`${multiplier}\u03C3`}
                    width={'18em'}
                    />
                  <p style={styles.thresholds}>
                    {`Discharge Threshold is ${roundToDigits((dischargeThreshold -aggregate.aboveMean)/aggregate.aboveStdDev, 2)} x \u03C3 above the mean`}
                  </p>
                </div>
              </div>
              <div style={styles.button}>
                <Button
                  value="GET REVENUE"
                  disabled={loading}
                  type="success"
                  onClick={getRevenue}
                  width={'10em'}
                  />
              </div>
            </div>
          </div>
        }
      </DashboardSection>
      <DashboardSection
        headerContent={'Revenue Surface'}>
        <div style={styles.surface}>
          {
            revenueSurface ?
            <ThreeDimensionalChart
              data={revenueSurface}
              />
            : <div></div>
          }
          <div style={styles.button}>
            <Button
              value="SHOW CHART"
              disabled={loading}
              type="success"
              onClick={getRevenueSurface}
              width={'10em'}
              />
          </div>
        </div>
        <div style={styles.button}>
          <Button
            value="TEST"
            disabled={loading}
            type="danger"
            onClick={getTest}
            width={'8em'}
            />
        </div>
      </DashboardSection>
    </ProjectPageTemplate>
  )
}

const styles = {
  specs: {
    padding: '0 2em',
  },
  columns: {
    display: 'flex',
    flexDirection: 'rows',
    justifyContent: 'space-between',
    maxWidth: '60em',
  },
  inclusion: {
    display: 'flex',
    flexDirection: 'column',
  },
  getData: {
    margin: '.5em 0 0 1.5em',
  },
  minDate: {
    padding: '0 0 1em',
  },
  revenueWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  controls: {
    display: 'flex',
    width: '45em',
    justifyContent: 'space-between',
  },
  revenue: {
    padding: '.5em 1em',
  },
  revenueDisplay: {
    display: 'inline-flex',
    alignItems: 'baseline',
  },
  thresholds: {
    lineHeight: '1.5em',
    fontStyle: 'italic',
    width: '15em',
    padding: '.5em',
  },
  button: {
    flex: 0,
  },
  surface: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1em',
  },
}

export default DevelopmentPlatform
