const { readTableRows } = require('../db/').connections

const getDemoProject = async (req, res, next) => {

  try {
    const [project] = await readTableRows('project', {type: 'demo'})

    return project ? res.status(200).json(project) : res.status(200).json(false)
  }
  catch (err) {
    console.error(`Error at getDemoProject: ${err}`)
    next(err)
  }
}

module.exports = getDemoProject
