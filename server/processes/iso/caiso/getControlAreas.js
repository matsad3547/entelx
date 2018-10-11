const { parseControlAreaData } = require('./parsers')

const getControlAreas = () => new Promise( (resolve, reject) => {

  const url = 'http://wwwmobile.caiso.com/Web.Service.Chart/ControlAreas.json?v=4'

  fetch(url)
    .then( res => res.buffer() )
    .then( buffer => buffer.toString() )
    .then( str => JSON.parse(str) )
    .then( json => parseControlAreaData(json) )
    .then(resolve)
    .catch(reject)
})

module.exports = getControlAreas
