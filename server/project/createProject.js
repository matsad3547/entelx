const { addProject } = require('./dbConnections/')
const { removeProject } = require('./dbConnections/')

const createProject = (req, res) => {
  const { type } = req.body
  // TODO add validation for request here
  if(type === 'demo') {
    removeProject({type: 'demo'})
      .then( () => true ) //just want to have just one project at a time
  }
  addProject(req.body)
    .then( id => res.status(200).json({id,}) )
    .catch( err => console.error(`Error at createProject: ${err}`))
}

module.exports = createProject
