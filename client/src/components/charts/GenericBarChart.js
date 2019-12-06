import React from 'react'
import PropTypes from 'prop-types'

import {
  BarChart,
  Cell,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'

import {
  // twelveHourFormat,
  // monthDayTimeFormat,
  // lineDataFormat,
  // colors,
} from '../../config/'

import {
  // formatDate,
  // findRelevantKeys,
  // roundToDigits,
  // formatDollars,
} from '../../utils'

const GenericBarChart = React.memo(({
  data,
  timeZone,
  aspect = 3,
}) => {

  // const dataTypes = findRelevantKeys(data)
  //                     .filter( d => Object.keys(lineDataFormat).includes(d) )
  //
  // const overThreshold = data.reduce( (agg, entry) => {
  //   const isScorePositive = entry.score > 0
  //
  //   const includeScore = isScorePositive ?
  //     entry[barKey] > posBarThreshold : entry[barKey] < negBarThreshold
  //
  //     const {
  //       score,
  //       ...remaining
  //     } = entry
  //
  //   return includeScore ? [...agg, entry] : [...agg, {...remaining}]
  // }, [])

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
            <CustomTooltip
              timeZone={timeZone}
              />
          }
          />
        <Bar
          yAxisId="left"
          dataKey="value"
          fill={'#000'}
          >
          {
            data.map( (entry, i) =>
            <Cell
              fill={entry.color}
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
