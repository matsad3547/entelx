import React from 'react'
import PropTypes from 'prop-types'

import {
  BarChart,
  Cell,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Brush,
} from 'recharts'

import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'

import {
  twelveHourFormat,
  monthDayTimeFormat,
  lineDataFormat,
  colors,
} from '../../config/'

import {
  formatDate,
  findRelevantKeys,
  roundToDigits,
  formatDollars,
} from '../../utils'

const BarChart = React.memo(({
  data,
  timeZone,
  barKey,
  aspect = 3,
  xRefLines = [],
  useBrush = false,
}) => {

  const dataTypes = findRelevantKeys(data)
                      .filter( d => Object.keys(lineDataFormat).includes(d) )

  const overThreshold = data.reduce( (agg, entry) => {
    const isScorePositive = entry.score > 0

    const includeScore = isScorePositive ?
      entry[barKey] > posBarThreshold : entry[barKey] < negBarThreshold

      const {
        score,
        ...remaining
      } = entry

    return includeScore ? [...agg, entry] : [...agg, {...remaining}]
  }, [])

  const yAxisPadding = { top: 10, bottom: 10}

  return (
    <ResponsiveContainer width={'100%'} aspect={aspect}>
      <BarChart
        data={overThreshold}
        margin={{top: 10, right: 0, left: 10, bottom: 0}}>
        <XAxis
          dataKey="timestamp"
          tickFormatter={isoString => formatDate(isoString, timeZone, twelveHourFormat)}
          />
        <YAxis
          yAxisId="left"
          tickCount={10}
          minTickGap={5}
          allowDecimals={false}
          padding={yAxisPadding}
          tickFormatter={ val => formatDollars(val)}
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
          yAxisId="right"
          dataKey={'score'}
          fill={'#000'}
          >
          {
            data.map( (entry, i) =>
            <Cell
              fill={entry.score > 0 ? colors.brightGreen : colors.lightBlue}
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

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    lmp: PropTypes.number,
    mvgAvg: PropTypes.number,
    score: PropTypes.number,
    timestamp: PropTypes.string, //iso string
  })).isRequired,
  barKey: PropTypes.string.isRequired,
  timeZone: PropTypes.string.isRequired,
}

export default BarChart
