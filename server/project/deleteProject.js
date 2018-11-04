const { removeProject } = require('./dbConnections/')

const deleteProject = (req, res) => {
  console.log('running remove project', req.body);
  // TODO add validation for request here
  removeProject(req.body)
    .then( val => {
      console.log('val from remove project:', val)
      return val
    })
    .then( ({ success }) => success ? res.sendStatus(200) : res.sendStatus(401) )
    .catch( err => console.error(`Error at deleteProject: ${err}`))
}

module.exports = deleteProject
