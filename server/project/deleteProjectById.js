const {
  deleteTableRows,
  readTableRows,
} = require('../db/')

const deleteProjectById = (req, res) => {

  const { id } = req.params

  return readTableRows('project', {id,})
    .then( project => {

      const {
        presentUpdatePid,
        pastUpdatePid,
      } = project[0]

      const handleError = err => console.error(`Error ending process ${presentUpdatePid} or ${pastUpdatePid}:`, err)

      try {
        process.kill(presentUpdatePid)
        process.kill(pastUpdatePid)
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
