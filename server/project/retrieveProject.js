const { readProject } = require('./dbConnections/')

const retrieveProject = (req, res) => {

  readProject(req.body)
    .then( project => project ? res.status(200).json({...project[0]}) : res.sendStatus(404) )
    .catch( err => console.error(`Error at retrieveProject: ${err}`) )
}

module.exports = retrieveProject
