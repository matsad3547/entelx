const { caisoPriceRequest } = require('../processes/')
const { scoreValues } = require('../utils/')

const caisoNodeEvaluator = (req, res) => {

  const {
    startMillis,
    endMillis,
    timeZone,
    lat,
    lng,
    marketType,
    node,
  } = req.body

  caisoPriceRequest(
    startMillis,
    endMillis,
    'PRC_INTVL_LMP',
    marketType,
    node,
  )
  .then( data => scoreValues(data, 'lmp', (7 * 24 * 60)/5))
  .then( parsed => res.json(parsed) )
  .catch( err => console.error('Error getting CAISO node evaluation data:', err) )
}

module.exports = caisoNodeEvaluator
