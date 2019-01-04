const {
  deleteTableRows,
  readTableRows,
} = require('../utils/')

const deleteProjectById = (req, res) => {

  const { id } = req.body

  return readTableRows('project', {id,})
    .then( project => {
      const { pid } = project[0]
      const handleError = e => console.error('Error ending process', pid,':', e)
      try {
        console.log('trying!');
        process.kill(pid)
      } catch (e) {
        handleError(e)
      }
      return deleteTableRows('project', {id,})
        .then( ({success}) => success ? res.sendStatus(200) : res.sendStatus(404) )
        .catch( err => console.error(`Error at deleteProjectById: ${err}`) )
    })

  // TODO Get the PID from the project table, then run `process.kill(<pid>)` before deleting the project

  // return deleteTableRows('project', {id,})
  //   .then( ({success}) => success ? res.sendStatus(200) : res.sendStatus(404) )
  //   .catch( err => console.error(`Error at deleteProjectById: ${err}`) )
}

module.exports = deleteProjectById
