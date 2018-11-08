const { deleteProject } = require('./dbConnections/')

const deleteProjectById = (req, res) => {

  const { id } = req.body

  return removeProject({id,})
    .then( ({success}) => success ? res.sendStatus(200) : res.sendStatus(404) )
    .catch( err => console.error(`Error at deleteProjectById: ${err}`) )
}

module.exports = deleteProjectById
