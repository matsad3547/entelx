import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment-timezone'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Loading from '../components/loading/'
import Button from '../components/button/'
import DashboardSection from '../components/DashboardSection'
// import DateControl from '../components/DateControl'
// import TimeIncrementSelect from '../components/TimeIncrementSelect'
// import LabeledCheckbox from '../components/LabeledCheckbox'
// import DataTimeDisplay from '../components/DataTimeDisplay'
import ValueControl from '../components/ValueControl'

import Label from '../components/Label'
import DataDisplay from '../components/DataDisplay'
import ThreeDimensionalChart from '../components/charts/ThreeDimensionalChart'


import {
  getBaseUrl,
  roundToDigits,
} from '../utils/'

import {
  singleRequest,
  parseResponse,
  getRequest,
} from '../utils/requestUtils'

// import {timeIncrements} from '../config/'
//
// import { useConnectToServerSideEvent } from '../hooks/'

import { formatDollars } from '../utils/'

import { blankDollars } from '../config/'

const InsightsDisplay = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'insights', projectId)

  const getNow = () => moment()

  const now = getNow()
  const oneWeekAgo = now.clone()
    .subtract(7, 'days')

  // const incrementsArr = Object.keys(timeIncrements)

  const [startTime, setStartTime] = useState(oneWeekAgo)
  const [endTime, setEndTime] = useState(now)

  const [chargeThreshold, setChargeThreshold] = useState(0)
  const [chargeStdDev, setChargeStdDev] = useState(0)

  const [dischargeThreshold, setDischargeThreshold] = useState(0)
  const [dischargeStdDev, setDischargeStdDev] = useState(0)

  const [multiplier, setMultiplier] = useState(.1)
  // const [timeIncrement, setTimeIncrement] = useState(incrementsArr[1])
  const [loading, setLoading] = useState(false)
  // const [timeseries, setTimeseries] = useState(null)
  const [data, setData] = useState(null)
  // const [aggregate, setAggregate] = useState(null)
  const [config, setConfig] = useState(null)
  const [revenue, setRevenue] = useState(0)
  // const [includeWeather, setIncludeWeather] = useState(false)
  // const [minDate, setMinDate] = useState(null)
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

  const getData = useCallback(() => {

    const startMillis = startTime.valueOf()
    const endMillis = endTime.valueOf()

    const body = {
      id: projectId,
      endMillis,
      startMillis,
    }

    setLoading(true)
    singleRequest('/insights/', getRequest('POST', JSON.stringify(body)))
      .then(parseResponse)
      .then( res => {
        setLoading(false)
        setData(res.data)
        setConfig(res.config)

        const {
          belowMean,
          belowStdDev,
          aboveMean,
          aboveStdDev,
        } = res.data

        setChargeThreshold(belowMean)
        setChargeStdDev(belowStdDev)
        setDischargeThreshold(aboveMean)
        setDischargeStdDev(aboveStdDev)

        // setTimeseries(res.timeseries)
        // setAggregate(res.aggregate)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error retrieving your project: ${err}`)
      })
  }, [startTime, endTime, projectId])

  const getRevenue = useCallback(() => {

    const body = {
      id: projectId,
      chargeThreshold,
      dischargeThreshold,
    }

    setLoading(true)
    singleRequest('/get_revenue_by_thresholds/', getRequest('POST', JSON.stringify(body)))
      .then(parseResponse)
      .then( res => {
        console.log('res:', res);
        setLoading(false)
        setRevenue(res.revenue)
      })
      .catch( err => {
        setLoading(false)
        console.error(`There was an error retrieving revenue data: ${err}`)
      })
  }, [chargeThreshold, dischargeThreshold, projectId])

  useEffect( () => {
    getData()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (

    <ProjectPageTemplate
      title={config ? `${config.projectName} - Insights` : 'Project Data Insights'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
      <div style={styles.columns}>
        <DashboardSection headerContent={'Values for Potential Charging'}>
          <div style={styles.specs}>
            <Label content="Number of Events"/>
            <DataDisplay content={`${data ? data.belowN : 0}`}/>
            <Label content="Average Price"/>
            <DataDisplay content={`${data ? formatDollars(data.belowMean) : blankDollars}`}/>
            <Label content="Lowest Price"/>
            <DataDisplay content={`${data ? formatDollars(data.belowMin) : blankDollars}`}/>
            <Label content="Highest Price"/>
            <DataDisplay content={`${data ? formatDollars(data.belowMax) : blankDollars}`}/>
            <Label content="Standard Deviation"/>
            <DataDisplay content={`${data ? formatDollars(data.belowStdDev) : blankDollars}`}/>
          </div>
        </DashboardSection>
        <DashboardSection headerContent={'Values for Potential Discharging'}>
          <div style={styles.specs}>
            <Label content="Number of Events"/>
            <DataDisplay content={`${data ? data.aboveN : 0}`}/>
            <Label content="Average Price"/>
            <DataDisplay content={`${data ? formatDollars(data.aboveMean) : blankDollars}`}/>
            <Label content="Lowest Price"/>
            <DataDisplay content={`${data ? formatDollars(data.aboveMin) : blankDollars}`}/>
            <Label content="Highest Price"/>
            <DataDisplay content={`${data ? formatDollars(data.aboveMax) : blankDollars}`}/>
            <Label content="Standard Deviation"/>
            <DataDisplay content={`${data ? formatDollars(data.aboveStdDev) : blankDollars}`}/>
          </div>
        </DashboardSection>
      </div>
      <DashboardSection
        headerContent={'Test Charge and Discharge Thresholds'}>
        <div style={styles.controls}>
          <ValueControl
            value={chargeThreshold || (config && config.chargeThreshold)}
            format={formatDollars}
            title="Charge Threshold"
            disabled={config && !config.chargeThreshold}
            onIncrement={onIncrementChargeThreshold}
            onDecrement={onDecrementChargeThreshold}
            onIncrementLabel={`${multiplier}\u03C3`}
            onDecrementLabel={`${multiplier}\u03C3`}
            />
          <ValueControl
            value={dischargeThreshold || (config && config.dischargeThreshold)}
            format={formatDollars}
            title="Discharge Threshold"
            disabled={config && !config.dischargeThreshold}
            onIncrement={onIncrementDischargeThreshold}
            onDecrement={onDecrementDischargeThreshold}
            onIncrementLabel={`${multiplier}\u03C3`}
            onDecrementLabel={`${multiplier}\u03C3`}
            />
        </div>
        <div style={styles.revenue}>
          <div>
            <Label content="7 Day Revenue for Selected Thresholds"/>
            <DataDisplay content={`${revenue ? formatDollars(revenue) : blankDollars}`}/>
          </div>
          <Button
            value="Get Revenue"
            disabled={loading}
            type="success"
            onClick={getRevenue}
            overrideStyles={styles.getData}
            />
        </div>
        {
          (revenue !== 0 && data) &&
          <div style={styles.thresholds}>
            <span>
              {`Charge Threshold is ${roundToDigits((data.belowMean - chargeThreshold)/data.belowStdDev, 2)} x \u03C3 below the mean`}
            </span>
            <span>
              {`Discharge Threshold is ${roundToDigits((dischargeThreshold -data.aboveMean)/data.aboveStdDev, 2)} x \u03C3 above the mean`}
            </span>
          </div>
        }
      </DashboardSection>
      <ThreeDimensionalChart />
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
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
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
  revenue: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  thresholds: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '2.5em',
    padding: '1em 0',
    fontStyle: 'italic',
  }
}

export default InsightsDisplay
