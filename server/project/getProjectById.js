const { readTableRows } = require('../utils/')

const getProjectById = (req, res) => {

  const { id } = req.body

  return readTableRows('project', {id,})
    .then( project => project ? res.status(200).json({...project}) : res.sendStatus(404) )
    .catch( err => console.error(`Error at getProjectById: ${err}`) )
}

module.exports = getProjectById
