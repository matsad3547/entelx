import React from 'react'
import PropTypes from 'prop-types'

import format from 'date-fns/format'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import { millisToTzDate } from '../utils/'

import { monthDayTimeFormat } from '../config/'


const LineChartLmp = ({data, tz}) => {

  const formatXDate = millis => format(millisToTzDate(millis, tz), monthDayTimeFormat)

  return (

    <LineChart
      width={800}
      height={500}
      data={data}
      margin={{top: 15, right: 30, left: 60, bottom: 5}}>
      <XAxis
        dataKey="timestamp"
        tickFormatter={formatXDate}
        />
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      <Line type="monotone" dataKey="lmp" stroke="#8884d8" activeDot={{r: 4}}/>
    </LineChart>
  )
}

LineChartLmp.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  tz: PropTypes.string.isRequired,
}

export default LineChartLmp
