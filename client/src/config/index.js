export const utcFormat = 'YYYY-MM-DDTHH:mm:ss.sss[Z]'

export const dayMonthYearTimeFormat = 'ddd, MMM Do YYYY, h:mm A'

export const monthDayTimeFormat = 'M/D h:mm A'

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
    format: value => Math.round((value * 100))/100,
  },
  temperature: {
    unit: '°C',
    label: 'Temperature',
    color: trendColors[1],
    format: value => Math.round(value),
  },
  windSpeed: {
    unit: ' m/s',
    label: 'Wind Speed',
    color: trendColors[2],
    format: value => Math.round(value),
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
    format: value => value * 100,
  },
  mvgAvg: {
    unit: '$/Mwh',
    label: 'Average Price',
    color: trendColors[6],
    format: value => Math.round((value * 100))/100,
  },
}

export const barDataFormat = {
  score: {
    unit: '',
    label: 'Score',
    color: value => value > 0 ? 'red' : 'green',
    format: value => value,
  }
}
