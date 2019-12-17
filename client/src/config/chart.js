import {
  roundToDigits,
  formatDollars,
} from '../utils/'

import {
  trendColors,
  rangeColors,
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

export const rangeDataFormat = {
  belowThreeSigma: {
    label: 'Below 3\u03C3',
    color: rangeColors[0],
  },
  belowTwoSigma:{
    label: 'Below 2\u03C3',
    color: rangeColors[1],
  },
  belowOneSigma:{
    label: 'Below 1\u03C3',
    color: rangeColors[2],
  },
  withinOneSigmaBelow:{
    label: 'Within 1\u03C3 Below',
    color: rangeColors[3],
  },
  withinOneSigmaAbove:{
    label: 'Within 1\u03C3 Above',
    color: rangeColors[4],
  },
  aboveOneSigma:{
    label: 'Above 1\u03C3',
    color: rangeColors[5],
  },
  aboveTwoSigma:{
    label: 'Above 2\u03C3',
    color: rangeColors[6],
  },
  aboveThreeSigma:{
    label: 'Above 3\u03C3',
    color: rangeColors[7],
  },
}
