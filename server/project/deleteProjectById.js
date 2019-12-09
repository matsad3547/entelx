const {
  deleteTableRows,
  readTableRows,
} = require('../db/').connections

const {
  catchErrorsWithMessage,
} = require('../utils/')

const deleteProjectById = async (req, res) => {

  const { id } = req.params

  const [project] = await catchErrorsWithMessage('There was an error getting previous project data', readTableRows)('project', {type: 'demo', id: id})

  const success = await deleteProject(project)

  success ? res.sendStatus(200) : res.sendStatus(400)
}

const deleteProject = async project => {

  const {
    presentUpdatePid,
    pastUpdatePid,
    id,
  } = project

  const handleError = err => console.error(`Error ending process ${presentUpdatePid} or ${pastUpdatePid}:`, err)

  try {
    presentUpdatePid && process.kill(presentUpdatePid)
    pastUpdatePid && process.kill(pastUpdatePid)
  }
  catch (e) {
    handleError(e)
  }

  const {success} = await catchErrorsWithMessage('There was an error getting previous project data', deleteTableRows)('project', {id,})

  return success
}

module.exports = {
  deleteProjectById,
  deleteProject,
}
