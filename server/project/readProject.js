const { getProject } = require('./dbConnections/')

const readProject = (req, res) => {

  const { id } = req.body

  console.log('id?', id);

  getProject({id,})
    .then( project => {
      console.log('project at readProject:', project);
      return project ? res.status(200).json({...project}) : res.sendStatus(404)
    })
    .catch( err => console.error(`Error at readProject: ${err}`) )
}

module.exports = readProject
