const { parseNodeData } = require('./parsers')

const getNodeLocations = () => new Promise( (resolve, reject) => {

  const url = 'http://wwwmobile.caiso.com/Web.Service.Chart/api/v1/ChartService/GetPriceContourMap'

  fetch(url)
    .then( res => res.buffer() )
    .then( buffer => buffer.toString() )
    .then( str => JSON.parse(str) )
    .then( json => parseNodeData(json) )
    .then(resolve)
    .catch(reject)
})

module.exports = {
  getNodeLocations,
}
