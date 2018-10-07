const oasisEndpoint = require('./oasisEndpoint')
const { getParser } = require('./utils')

const caisoPriceRequest = (
  startMillis,
  endMillis,
  query,
  marketType,
  node,
) => new Promise( (resolve, reject) =>

  oasisEndpoint(
    startMillis,
    endMillis,
    query,
    marketType,
    node,
  )
  .then( str => {
    const json = JSON.parse(str)
    const parser = getParser(query)
    resolve(parser(query, json))
  })
  .catch(reject)
)

module.exports = caisoPriceRequest
