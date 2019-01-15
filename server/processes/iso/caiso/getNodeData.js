const moment = require('moment-timezone')

const getNodeLocations = require('./getNodeLocations')

const oasisEndpoint = require('./oasisEndpoint')

// http://oasis.caiso.com/oasisapi/SingleZip?queryname=ATL_APNODE&APnode_type=ALL&startdatetime=20180919T07:00-0000&enddatetime=20180920T07:00-0000&version=1

const getNodeData = () => {

  return getNodeLocations()
    .then( nodes => nodes.map( node => node.name ))
    .then( names => {

      console.log('names:', names);

      const timeZone = 'America/Los_Angeles'

      const now = moment().tz(timeZone)
      const endMillis = now.valueOf()
      const startMillis = now.clone()
      .subtract(1, 'days')
      .valueOf()

      return oasisEndpoint(
        'ATL_APNODE&APnode_type=ALL',
        null,
        startMillis,
        endMillis,
      )
      .then( vals => {
        const matches = vals.filter( val => names.includes(val.name) )
        //1700 'ATL_CBNODE'
        console.log('matches:', matches, matches.length)} )
    })

}

module.exports = getNodeData
