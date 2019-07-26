const { caisoPriceRequest } = require('../processes/')
const { calculateScoreData } = require('../utils/')

const weekOf5Mins = (7 * 24 * 60) / 5

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
    .then( data => calculateScoreData(data, 'lmp', {period: 2 * weekOf5Mins}) )
    .then( parsed => res.json(parsed) )
    .catch( err => console.error('Error getting CAISO node evaluation data:', err) )
}

module.exports = caisoNodeEvaluator
