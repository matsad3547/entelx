const {
  deleteTableRows,
  readTableRows,
} = require('../utils/')

const deleteProjectById = (req, res) => {

  const { id } = req.body

  return readTableRows('project', {id,})
    .then( project => {

      const { pid } = project[0]

      const handleError = err => console.error(`Error ending process ${pid}:`, err)

      try {
        process.kill(pid)
      }
      catch (e) {
        handleError(e)
      }
      return deleteTableRows('project', {id,})
        .then( ({success}) => success ? res.sendStatus(200) : res.sendStatus(404) )
        .catch( err => console.error(`Error at deleteProjectById: ${err}`) )
    })
}

module.exports = deleteProjectById
