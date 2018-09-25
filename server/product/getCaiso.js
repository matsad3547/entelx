// const { getLmp } = require('../processes/getLmp')
const {
  aggregateHistoricalWeather,
  oasisEndpoint,
} = require('../processes/')

const getCaiso = (req, res) => {

  const {
    startMillis,
    endMillis,
    timeZone,
    lat,
    lng,
    marketType,
    node,
  } = req.body

  // oasisEndpoint(
  //   startMillis,
  //   endMillis,
  //   'ATL_APNODE&APnode_type=ALL',
  //   false,
  //   null,
  //   null,
  //   true,
  // )
  //   .then(d => console.log('caiso endpoint:', d, ' length:', d.length))
  //   .catch( err => console.error('Caiso endpoint reject error:', err))

  Promise.all([
    aggregateHistoricalWeather(
      startMillis,
      endMillis,
      timeZone,
      lat,
      lng,
    ),
    oasisEndpoint(
      startMillis,
      endMillis,
      'PRC_INTVL_LMP',
      true,
      marketType,
      node,
    )
  ])
  .then( data => data.reduce( (agr, arr) => [...agr, ...arr] )
    .sort( (a, b) => a.timestamp - b.timestamp )
    .reduce( (agr, obj, i) =>
      i > 0 && obj.timestamp === agr[agr.length - 1].timestamp ?
      [
        ...agr.slice(0, agr.length - 1),
        {
          ...agr[agr.length - 1],
          ...obj,
        },
      ]:
      [
        ...agr,
        obj,
      ], [])
  )
  .then( parsed => res.json(parsed) )
  .catch( err => console.error('Error getting CAISO data:', err) )
}

module.exports = getCaiso
