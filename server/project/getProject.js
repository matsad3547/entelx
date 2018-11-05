const { readProject } = require('./dbConnections/')

const getProject = (req, res) => {

  readProject(req.body)
    .then( project => project ? res.status(200).json({...project}) : res.sendStatus(404) )
    .catch( err => console.error(`Error at getProject: ${err}`) )
}

module.exports = getProject
