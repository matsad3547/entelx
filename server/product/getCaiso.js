// const { getLmp } = require('../processes/getLmp')
const {
  aggregateHistoricalWeather,
  oasisEndpoint,
  getNodeLocations,
} = require('../processes/')

const modifyNode = require('../processes/dbConnections/modifyNode')

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

  oasisEndpoint(
    startMillis,
    endMillis,
    'ATL_TIEPOINT',
    true,
    // null,
    // null,
    // true,
  )
    .then(nodes => {
      console.log('caiso endpoint:', nodes, ' length:', nodes.length)
      // nodes.forEach( node => modifyNode(node) )
      // console.log('node types: ', nodes.reduce((arr, node) => arr.includes(node.apnode_type) ? arr : [...arr, node.apnode_type], []))
    })
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
