const { caisoPriceRequest } = require('../processes/')

const caisoNodeEvaluator = (req, res) => {

  const {
    startMillis,
    endMillis,
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
    .then( parsed => res.json(parsed) )
    .catch( err => console.error('Error getting CAISO node evaluation data:', err) )
}

module.exports = caisoNodeEvaluator
