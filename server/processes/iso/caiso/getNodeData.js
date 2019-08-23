const moment = require('moment-timezone')

const getNodeLocations = require('./getNodeLocations')

const oasisEndpoint = require('./oasisEndpoint')

// http://oasis.caiso.com/oasisapi/SingleZip?queryname=ATL_APNODE&APnode_type=ALL&startdatetime=20180919T07:00-0000&enddatetime=20180920T07:00-0000&version=1

const getNodeData = async () => {

  const nodes = await getNodeLocations()

  const nodeNames = nodes.map( node => node.name )

  const timeZone = 'America/Los_Angeles'

  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
  .subtract(1, 'days')
  .valueOf()

  const nodeData = await oasisEndpoint(
    'ATL_APNODE&APnode_type=ALL',
    null,
    startMillis,
    endMillis,
  )

  const withMax = nodeData.filter( nd => !isNaN(nd.max_mw) && nodeNames.includes(nd.name) )

  console.log('with max:', withMax, withMax.length, '\nnumber of nodes:', nodes.length );

  // const matches = nodeData.filter( val => nodeNames.includes(val.name) )
  // console.log('matches:', matches, matches.length)

}

module.exports = getNodeData
