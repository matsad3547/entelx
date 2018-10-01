// const { getLmp } = require('../processes/getLmp')
const {
  aggregateHistoricalWeather,
  oasisEndpoint,
  getNodeLocations,
} = require('../processes/')

const addNode = require('../processes/dbConnections/addNode')

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

  // getNodeLocations()
  //   .then(res => {
  //     console.log('node locations:', res)
  //     // res.map( node => addNode(node) )
  //
  //   })
  //   .catch( err => console.error('There was an error getting node locations:', err))

  oasisEndpoint(
    startMillis,
    endMillis,
    'ATL_APNODE&APnode_type=ALL',
    true,
    // null,
    // null,
    // true,
  )
    .then(d => console.log('caiso endpoint:', d, ' length:', d.length))
    .catch( err => console.error('Caiso endpoint reject error:', err))

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
