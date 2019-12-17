import React from 'react'
import PropTypes from 'prop-types'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import GroupedTooltip from './GroupedTooltip'

const GroupedBarChart = React.memo(({
  data,
  dataConfig,
  timeZone,
  aspect = 3,
}) => {

  const dataKeys = Object.keys(dataConfig)

  const yAxisPadding = { top: 10, bottom: 10}

  console.log({data});

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
          content={<GroupedTooltip />}
          />
          {
            dataKeys.map( (dk, i) =>
            <Bar
              yAxisId="left"
              dataKey={dk}
              name={dataConfig[dk].label}
              key={`by-${dk}-bar-${i}`}
              fill={dataConfig[dk].color}
              formatter={dataConfig[dk].formatter}
              /> )
          }
      </BarChart>
    </ResponsiveContainer>
  )
})

GroupedBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    //plus the data - keyed by `dataKeys`
    label: PropTypes.string,
  })).isRequired,
  dataConfig: PropTypes.object.isRequired,
  timeZone: PropTypes.string.isRequired,
  aspect: PropTypes.number,
}

export default GroupedBarChart
