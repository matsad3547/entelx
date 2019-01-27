const {
  findByLatLng,
  createTableRow,
  updateTableRow,
  deleteTableRows,
} = require('../db/')

const { findClosest } = require('../utils/')

const { setProjectData } = require('../product/')

const handleError = err => {
  throw err
}

const createNewProject = async (req, res, next) => {
  const { type } = req.body
  // TODO add validation for request here
  if(type === 'demo') {
    //just want to have just one demo project at a time
    await deleteTableRows('project', {type: 'demo'})
  }
  return createProject(req.body, res, next)
    .catch(err => {
      console.error(`Error at createProject: ${err}`)
      next(err)
    })
}

const createProject = async (data, res, next) => {

  const {
    lat,
    lng,
  } = data

  // TODO Get timezone from this way: https://www.mapbox.com/help/create-a-timezone-finder-with-mapbox-tilequery-api/
  const timeZone = 'America/Los_Angeles'

  const manualData = {
    ...data,
    timeZone,
  }

  const [ id ] = await createTableRow('project', manualData)

  const matches = await findByLatLng('node', lat, lng)

  const node = findClosest(lat, lng, matches)

  await updateTableRow('project', {id,}, {nodeId: node.id})

  await setProjectData(node, id, timeZone)

  res.status(200).json({id,})
}

module.exports = createNewProject
