// const { parseNodeData } = require('./parsers')

const getControlAreas = () => new Promise( (resolve, reject) => {

  const url = 'http://wwwmobile.caiso.com/Web.Service.Chart/ControlAreas.json?v=4'

  fetch(url)
    .then( res => res.buffer() )
    .then( buffer => buffer.toString() )
    .then(resolve)
    // .then( str => JSON.parse(str) )
    // .then( json => parseNodeData(json) )
    .catch(reject)
})

module.exports = getControlAreas
