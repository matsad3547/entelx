import {
  roundToDigits,
  formatDollars,
} from '../utils/'

import {
  trendColors
} from './styles'

export const lineDataFormat = {
  lmp: {
    unit: '$/Mwh',
    label: 'Locational Marginal Price',
    color: trendColors[0],
    format: formatDollars,
  },
  temperature: {
    unit: '°F',
    label: 'Temperature',
    color: trendColors[1],
    format: value => roundToDigits(value, 0),
  },
  windSpeed: {
    unit: ' m/s',
    label: 'Wind Speed',
    color: trendColors[2],
    format: value => roundToDigits(value, 0),
  },
  windBearing: {
    unit: '°',
    label: 'Wind Bearing',
    color: trendColors[3],
    format: value => value ? value : 'n/a',
  },
  cloudCover: {
    unit: '%',
    label: 'Cloud Cover',
    color: trendColors[4],
    format: value => roundToDigits(value, 2) * 100,
  },
  mvgAvg: {
    unit: '$/Mwh',
    label: '3 Week Moving Avg',
    color: trendColors[6],
    format: formatDollars,
  },
}

export const barDataFormat = {
  score: {
    unit: '',
    label: 'Score',
    color: value => value > 0 ? 'red' : 'green',
    format: value => roundToDigits(value, 3),
  }
}
