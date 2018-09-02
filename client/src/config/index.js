export const utcFormat = 'YYYY-MM-DDTHH:mm:ss.sss[Z]'

export const dayMonthYearTimeFormat = 'ddd, MMM Do YYYY, h:mm A'

export const monthDayTimeFormat = 'M/D h:mm A'

export const dataLabels = {
  lmp: {
    unit: '$/Mwh',
    label: 'Locational Marginal Price',
    format: value => Math.round((value * 100))/100,
  },
  temperature: {
    unit: '°F',
    label: 'Temperature',
    format: value => Math.round(value),
  },
}
