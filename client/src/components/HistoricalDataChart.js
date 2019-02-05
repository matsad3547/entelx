import React, {useState, useEffect} from 'react'

import LineBarChart from '../components/charts/LineBarChart'

import DashboardSection from '../components/DashboardSection'

const HistoricalDataChart = ({data, timeZone}) => {
  console.log('rendering the chart');

  const [historicalData, setHistoricalData] = useState(null)

  useEffect( () => {
    setHistoricalData(data)
  }, [data])

  return (
    <DashboardSection headerContent={'Historical Data'}>
      {
        historicalData &&
        <LineBarChart
          barKey={'lmp'}
          data={historicalData}
          timeZone={timeZone}
          aspect={3}
          />
      }
    </DashboardSection>
  )
}

export default HistoricalDataChart
