const { addProject } = require('./dbConnections/')
const { removeProject } = require('./dbConnections/')
const {
  findByLatLng,
  findClosestId,
} = require('../utils/')

const createProject = (req, res) => {
  const {
    type,
    lat,
    lng,
  } = req.body
  // TODO add validation for request here
  if(type === 'demo') {
    removeProject({type: 'demo'})
      .then( () => true ) //just want to have just one project at a time
  }
  addProject(req.body)
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
    .catch( err => console.error(`Error at createProject: ${err}`))
}

module.exports = createProject
