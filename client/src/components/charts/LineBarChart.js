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

import {
  monthDayTimeFormat,
  lineDataFormat,
} from '../../config/'

import {
  formatMillis,
  findRelevantKeys,
} from '../../utils'

const LineBarChart = ({
  data,
  timeZone,
}) => {

  const dataTypes = findRelevantKeys(data)
                      .filter( d => Object.keys(lineDataFormat).includes(d) )

  return (
    <ComposedChart
      width={1200}
      height={450}
      data={data}
      margin={{top: 0, right: 0, left: 0, bottom: 0}}>
      <XAxis
        dataKey="timestamp"
        tickFormatter={millis => formatMillis(millis, timeZone, monthDayTimeFormat)}
        />
      <YAxis/>
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
