import React from 'react'

import LineBarChart from '../components/charts/LineBarChart'

import DashboardSection from '../components/DashboardSection'

const HistoricalDataChart = React.memo(({data, timeZone}) => (
    <DashboardSection headerContent={'Historical Data'}>
      <LineBarChart
        barKey={'lmp'}
        data={data}
        timeZone={timeZone}
        aspect={3}
        />
    </DashboardSection>
  )
)

export default HistoricalDataChart
