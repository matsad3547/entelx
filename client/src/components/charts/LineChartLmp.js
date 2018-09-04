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

import CustomTooltip from './CustomTooltip'

import {
  monthDayTimeFormat,
  dataFormat,
} from '../../config/'

import { formatMillis } from '../../utils'

const dataTypes = Object.keys(dataFormat)

const LineChartLmp = ({data, tz}) => (

  <LineChart
    width={800}
    height={450}
    data={data}
    margin={{top: 0, right: 0, left: 0, bottom: 0}}>
    <XAxis
      dataKey="timestamp"
      tickFormatter={millis => formatMillis(millis, tz, monthDayTimeFormat)}
    />
    <YAxis/>
    <CartesianGrid strokeDasharray="3 3"/>
    <Tooltip
      content={
        <CustomTooltip
          tz={tz}
        />
      }/>
    <Legend />
    {
      dataTypes.map( t =>
        <Line
          key={`${t}-line`}
          type="monotone"
          dataKey={t}
          connectNulls={true}
          stroke={dataFormat[t].color}
          activeDot={{r: 4}}
        />
      )
    }
  </LineChart>
)

LineChartLmp.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  tz: PropTypes.string.isRequired,
}

export default LineChartLmp
