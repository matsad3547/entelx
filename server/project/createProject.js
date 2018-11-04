const { addProject } = require('./dbConnections/')

const createProject = (req, res) => {
  // TODO add validation for request here
  addProject(req.body)
    .then( id => res.status(200).json({id,}) )
    .catch( err => console.error(`Error at createProject: ${err}`))
}

module.exports = createProject
