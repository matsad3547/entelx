import React from 'react'
import PropTypes from 'prop-types'

import {
  ComposedChart,
  Cell,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'

import { monthDayTimeFormat } from '../../config/'

import { lineDataFormat } from '../../config/chart'

import {
  formatMillis,
  findRelevantKeys,
} from '../../utils'

const LineBarChart = ({
  data,
  timeZone,
  width = 1000,
  height = 400,
}) => {

  const dataTypes = findRelevantKeys(data)
                      .filter( d => Object.keys(lineDataFormat).includes(d) )

  return (
    <ComposedChart
      width={width}
      height={height}
      data={data}
      margin={{top: 0, right: 0, left: 0, bottom: 0}}>
      <XAxis
        dataKey="timestamp"
        tickFormatter={millis => formatMillis(millis, timeZone, monthDayTimeFormat)}
        />
      <YAxis
        yAxisId="left"
        tickCount={10}
        minTickGap={5}
        />
      <YAxis
        yAxisId="right"
        orientation="right"
        domain={[-3, 3]}
        />
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip
        content={
          <CustomTooltip
            timeZone={timeZone}
          />
      }/>
      {
        dataTypes.map( t =>
          <Line
            yAxisId="left"
            key={`${t}-line`}
            type="monotone"
            dataKey={t}
            connectNulls={true}
            stroke={lineDataFormat[t].color}
            dot={false}
          />
        )
      }
      <Bar
        yAxisId="right"
        dataKey={'score'}
        width={10}
        fill={'#000'}
      >
      {
        data.map( (entry, i) =>
          <Cell
            fill={entry.score > 0 ? 'red' : 'green'}
            key={`bar-${i}`}
          />
        )
      }
      </Bar>
      <Legend
        content={
          <CustomLegend />
        }
      />
    </ComposedChart>
  )
}

LineBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  timeZone: PropTypes.string.isRequired,
}

export default LineBarChart
