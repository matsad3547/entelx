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
  ReferenceLine,
  ResponsiveContainer
} from 'recharts'

import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'

import { monthDayTimeFormat } from '../../config/'

import { lineDataFormat } from '../../config/chart'

import { colors } from '../../config/styles'

import {
  formatMillis,
  findRelevantKeys,
} from '../../utils'

const LineBarChart = ({
  data,
  timeZone,
  barKey,
  negBarThreshold = 0,
  posBarThreshold = 0,
  aspect = 3,
  xRefLines = [],
}) => {

  const dataTypes = findRelevantKeys(data)
                      .filter( d => Object.keys(lineDataFormat).includes(d) )

  const overThreshold = data.reduce( (agg, entry) => {
    const isScorePositive = entry.score > 0

    const includeScore = isScorePositive ?
      entry[barKey] > entry.mvgAvg + posBarThreshold : entry[barKey] < entry.mvgAvg - negBarThreshold

      const {
        score,
        ...remaining
      } = entry

    return includeScore ? [...agg, entry] : [...agg, {...remaining}]
  }, [])

  return (
    <ResponsiveContainer width={'98%'} aspect={aspect}>
      <ComposedChart
        data={overThreshold}
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
          tickCount={5}
          domain={[-3, 3]}
          />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip
          content={
            <CustomTooltip
              timeZone={timeZone}
              />
          }
          />
        <ReferenceLine
          y={0}
          yAxisId="right"
          stroke={colors.gray}
          strokeDasharray="4 4"
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
      {
        xRefLines.map( (x, i) =>
        <ReferenceLine
          x={x}
          yAxisId="right"
          key={`x-${i}`}
          />
      )
    }
    <Legend
      content={
        <CustomLegend />
      }
      />
  </ComposedChart>
    </ResponsiveContainer>
  )
}

LineBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    lmp: PropTypes.number,
    mvgAvg: PropTypes.number,
    score: PropTypes.number,
    timestamp: PropTypes.number,
  })).isRequired,
  barKey: PropTypes.string.isRequired,
  posBarThreshold: PropTypes.number,
  negBarThreshold: PropTypes.number,
  timeZone: PropTypes.string.isRequired,
  xRefLines: PropTypes.arrayOf(PropTypes.number),
}

export default LineBarChart
