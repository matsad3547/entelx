const { removeProject } = require('./dbConnections/')

const deleteProject = (req, res) => removeProject(req.body)
  .then( ({success}) => success ? res.sendStatus(200) : res.sendStatus(404) )
  .catch( err => console.error(`Error at deleteProject: ${err}`) )

module.exports = deleteProject
