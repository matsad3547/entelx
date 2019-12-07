import React from 'react'
import PropTypes from 'prop-types'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import TimeseriesTooltip from './TimeseriesTooltip'
import CustomLegend from './CustomLegend'

import {
  monthDayTimeFormat,
  lineDataFormat,
} from '../../config/'

import {
  formatDate,
  findRelevantKeys,
} from '../../utils'

const LineOnlyChart = ({data, tz}) => {

  const dataTypes = findRelevantKeys(data)
                      .filter( d => Object.keys(lineDataFormat).includes(d) )

  return (
    <LineChart
      width={1200}
      height={450}
      data={data}
      margin={{top: 0, right: 0, left: 0, bottom: 0}}>
      <XAxis
        dataKey="timestamp"
        tickFormatter={isoString => formatDate(isoString, tz, monthDayTimeFormat)}
        />
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip
        content={
          <TimeseriesTooltip
            tz={tz}
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
      <Legend
        content={
          <CustomLegend />
        }
        />
    </LineChart>
  )
}

LineOnlyChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  tz: PropTypes.string.isRequired,
}

export default LineOnlyChart
