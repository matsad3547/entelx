const { createProject } = require('./dbConnections/')
const { deleteProject } = require('./dbConnections/')
const {
  findByLatLng,
  findClosestId,
} = require('../utils/')

const createNewProject = (req, res) => {
  const {
    type,
    lat,
    lng,
  } = req.body
  // TODO add validation for request here
  if(type === 'demo') {
    deleteProject({type: 'demo'})
      .then( () => true ) //just want to have just one demo project at a time
  }
  createProject(req.body)
    .then( id => {
      res.status(200).json({id: id[0]})
      return id[0]
    })
    .then( id => findByLatLng(lat, lng, 'node')
        .then( matches => {
          const nodeId = findClosestId(lat, lng, matches)
          console.log('id still defined?', id, 'closest node:', nodeId)
          //filter by closest haversine distance
          //send id of selected node to DB
          //start data processing for that node
        })
        .catch( err => console.error(`Error getting a result from the 'node' table by lat lng: ${err}`))
    )
    .catch( err => console.error(`Error at createNewProject: ${err}`))
}

module.exports = createNewProject
