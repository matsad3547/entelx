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

import { monthDayTimeFormat } from '../../config/'

import { formatMillis } from '../../utils'

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
    <Line type="monotone" dataKey="lmp" stroke="#8884d8" activeDot={{r: 4}}/>
    <Line type="monotone" dataKey="temperature" stroke="#82ca9d" activeDot={{r: 4}}/>
  </LineChart>
)

LineChartLmp.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  tz: PropTypes.string.isRequired,
}

export default LineChartLmp
