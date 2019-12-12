import React from 'react'
import PropTypes from 'prop-types'

import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import BarChartTooltip from './BarChartTooltip'

const GenericBarChart = React.memo(({
  data,
  timeZone,
  children,
  aspect = 3,
}) => {

  const yAxisPadding = { top: 10, bottom: 10}

  return (
    <ResponsiveContainer width={'100%'} aspect={aspect}>
      <BarChart
        data={data}
        margin={{top: 10, right: 0, left: 10, bottom: 0}}>
        <XAxis dataKey="label" />
        <YAxis
          yAxisId="left"
          tickCount={10}
          minTickGap={5}
          allowDecimals={false}
          padding={yAxisPadding}
          />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip
          content={
            <BarChartTooltip />
          }
          />
        {children}
      </BarChart>
    </ResponsiveContainer>
  )
})

GenericBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
    fill: PropTypes.string,
  })).isRequired,
  timeZone: PropTypes.string.isRequired,
}

export default GenericBarChart
