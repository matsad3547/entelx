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
    color: trendColors[3],
    format: formatDollars,
  },
  mvgAvg: {
    unit: '$/Mwh',
    label: '3 Week Moving Avg',
    color: trendColors[6],
    format: formatDollars,
  },
  temperature: {
    unit: '°F',
    label: 'Temperature',
    color: trendColors[2],
    format: value => roundToDigits(value, 0),
  },
  windSpeed: {
    unit: ' m/s',
    label: 'Wind Speed',
    color: trendColors[5],
    format: value => roundToDigits(value, 0),
  },
  windBearing: {
    unit: '°',
    label: 'Wind Bearing',
    color: trendColors[4],
    format: value => value ? value : 'n/a',
  },
  cloudCover: {
    unit: '%',
    label: 'Cloud Cover',
    color: trendColors[6],
    format: value => roundToDigits(value, 2) * 100,
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

export const rangeLabels = {
  belowThreeSigma: 'Below 3\u03C3',
  belowTwoSigma: 'Below 2\u03C3',
  belowOneSigma: 'Below 1\u03C3',
  withinOneSigmaBelow: 'Within 1\u03C3 Below',
  withinOneSigmaAbove: 'Within 1\u03C3 Above',
  aboveOneSigma: 'Above 1\u03C3',
  aboveTwoSigma: 'Above 2\u03C3',
  aboveThreeSigma: 'Above 3\u03C3',
}
