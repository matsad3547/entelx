const { deleteTableRows } = require('../utils/')

const deleteProjectById = (req, res) => {

  const { id } = req.body
  
  // TODO Get the PID from the project table, then run `process.kill(<pid>)` before deleting the project

  return deleteTableRows('project', {id,})
    .then( ({success}) => success ? res.sendStatus(200) : res.sendStatus(404) )
    .catch( err => console.error(`Error at deleteProjectById: ${err}`) )
}

module.exports = deleteProjectById
