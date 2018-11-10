const moment = require('moment-timezone')

const {
  findByLatLng,
  findClosest,
  createTableRow,
  updateTableRow,
  deleteTableRows,
  scoreValues,
} = require('../utils/')

const { caisoPriceRequest } = require('../processes/')

const timeZone = 'America/Los_Angeles'
const now = moment().tz(timeZone)
const endMillis = now.valueOf()
const startMillis = now.clone()
                    .subtract(1, 'days')
                    .valueOf()

const weekOf5Mins = (7 * 24 * 60) / 5

const createNewProject = (req, res) => {
  const { type } = req.body
  // TODO add validation for request here
  if(type === 'demo') {
    //just want to have just one demo project at a time
    deleteTableRows('project', {type: 'demo'})
      .then( () => createProject(req.body, res) )
  }
  else {
    createProject(req.body, res)
  }
}


const createProject = (data, res) => {

  const {
    lat,
    lng,
  } = data

  createTableRow('project', data)
    .then( id => id[0] )
    .then( id => findByLatLng('node', lat, lng)
      .then( matches => {
        const node = findClosest(lat, lng, matches)
        updateTableRow('project', {id,}, {node_id: node.id})
          .then( () => res.status(200).json({id,}))
          .then( () => {
            caisoPriceRequest(
              startMillis,
              endMillis,
              'PRC_INTVL_LMP',
              'RTM',
              node.name,
            )
              .then( data => scoreValues(data, 'lmp', 2 * weekOf5Mins) )
              .then( data => console.log(`Parsed data from ${node.name}: ${data}`) )
              .catch( err => console.error('Error getting CAISO node evaluation data:', err) )
            })
          .catch( err => console.error(`Error updating project ${id}: ${err}`) )
      })
      .catch( err => console.error(`Error getting a result from the 'node' table by lat lng: ${err}`))
    )
    .catch(err => console.error(`Error at createProject: ${err}`))
}

module.exports = createNewProject
