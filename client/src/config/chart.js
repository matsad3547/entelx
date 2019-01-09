import { roundToDigits } from '../utils/'

export const trendColors = [
  '#03CEA4',
  '#78C3FB',
  '#89A6FB',
  '#7067CF',
  '#345995',
  '#A11692',
  '#861388',
]

export const lineDataFormat = {
  lmp: {
    unit: '$/Mwh',
    label: 'Locational Marginal Price',
    color: trendColors[0],
    format: value => roundToDigits(value, 2),
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
    label: 'Average Price',
    color: trendColors[6],
    format: value => Math.round((value * 100)) / 100,
  },
}

export const barDataFormat = {
  score: {
    unit: '',
    label: 'Score',
    color: value => value > 0 ? 'red' : 'green',
    format: value => Math.round((value * 1000)) / 1000,
  }
}
