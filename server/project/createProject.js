const { addProject } = require('./dbConnections/')
const { removeProject } = require('./dbConnections/')

const createProject = (req, res) => {
  const { type } = req.body
  // if(type === 'demo') {
  //   removeProject({type: 'demo'})
  //     .then( val => console.log('value from removing project', val))
  // }
  // TODO add validation for request here
  // TODO if a new project request is a demo, delete previous demo projects
  addProject(req.body)
    .then( id => res.status(200).json({id,}) )
    .catch( err => console.error(`Error at createProject: ${err}`))
}

module.exports = createProject
