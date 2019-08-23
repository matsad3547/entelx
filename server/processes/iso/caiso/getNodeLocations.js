const { parseNodeData } = require('./parsers')
const { checkStatus } = require('../../../utils')

// to run from the console:
// 1. Go to `server/processes/iso/caiso`
// 2. Run `$ node -e 'require("./getNodeLocations")()'`

const fetch = require('isomorphic-fetch')

const getNodeLocations = () => {

  const url = 'http://wwwmobile.caiso.com/Web.Service.Chart/api/v1/ChartService/GetPriceContourMap'

  return fetch(url)
    .then(checkStatus)
    .then( res => res.buffer() )
    .then( buffer => buffer.toString() )
    .then( str => JSON.parse(str) )
    .then( json => parseNodeData(json) )
    // .then( parsed => console.log('parsed node locations', parsed, parsed.length) )
    .catch( err => console.error('There was an error getting node locations:', err) )
}

module.exports = getNodeLocations
