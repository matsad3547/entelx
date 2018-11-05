const { removeProject } = require('./dbConnections/')

const deleteProject = (req, res) => removeProject(req.body)
  .then( ({success}) => success ? res.sendStatus(200) : res.sendStatus(404) )
  .catch( error => res.sendStatus(500).json({error}))


module.exports = deleteProject
