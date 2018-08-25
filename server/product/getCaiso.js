const { getLmp } = require('../processes/getLmp')

const getCaiso = (req, res) => {

  const {
    startDate,
    endDate,
  } = req.body

  getLmp(startDate, endDate)
    .then( data => {
      res.json({
        data,
      })
    })
    .catch( err => console.error('Error getting CAISO data:', err) )
}

module.exports = getCaiso
