const { readProject } = require('./dbConnections/')

const getProjectById = (req, res) => {

  const { id } = req.body

  console.log('id?', id);

  readProject({id,})
    .then( project => {
      console.log('project at getProjectById:', project);
      return project ? res.status(200).json({...project}) : res.sendStatus(404)
    })
    .catch( err => console.error(`Error at getProjectById: ${err}`) )
}

module.exports = getProjectById
