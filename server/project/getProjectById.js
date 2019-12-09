const { readTableRows } = require('../db/').connections

const getProjectById = async (req, res, next) => {

  const { id } = req.params

  try {
    const [project] = await readTableRows('project', {id,})

    return project ? res.status(200).json(project) : res.sendStatus(404)
  }
  catch (err) {
    console.error(`Error at getProjectById: ${err}`)
    next(err)
  }
}

module.exports = getProjectById
