const {
  findByLatLng,
  findClosestId,
  createTableRow,
  updateTableRow,
  deleteTableRows,
} = require('../utils/')

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
        const nodeId = findClosestId(lat, lng, matches)
        updateTableRow('project', {id,}, {node_id: nodeId})
          .then( () => res.status(200).json({id,}))
          // TODO Send the node id off to be calculated 
          .then( () => console.log(`sending node ${nodeId} to be calculated`) )
          .catch( err => console.error(`Error updating project ${id}: ${err}`) )
      })
      .catch( err => console.error(`Error getting a result from the 'node' table by lat lng: ${err}`))
    )
    .catch(err => console.error(`Error at createProject: ${err}`))
}

module.exports = createNewProject
