const {
  findByLatLng,
  readTableRows,
  createTableRow,
  updateTableRow,
} = require('../db/').connections

const {
  findClosest,
  catchErrorsWithMessage,
} = require('../utils/')

const { deleteProject } = require('./deleteProjectById')

const { setProjectData } = require('../product/')

const createNewProject = async (req, res, next) => {
  const { type } = req.body
  // TODO add validation for request here
  if(type === 'demo') {
    //just want to have just one demo project at a time
    const [project] = await catchErrorsWithMessage('There was an error getting previous project data', readTableRows)('project', {type: 'demo'})

    if (project){
      await deleteProject(project)
    }
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
    name,
  } = data

  console.log(`Creating the ${name} project...`);

  // TODO Get timezone from this way: https://www.mapbox.com/help/create-a-timezone-finder-with-mapbox-tilequery-api/
  const timeZone = 'America/Los_Angeles'
  const dischargeBuffer = 0
  const chargeBuffer = 0
  const charge = 0
  const revenue = 0

  const projectData = {
    ...data,
    timeZone,
    dischargeBuffer,
    chargeBuffer,
    charge,
    revenue,
  }

  const [ id ] = await createTableRow('project', projectData)

  const matches = await findByLatLng('node', lat, lng)

  const node = findClosest(lat, lng, matches)

  await updateTableRow('project', {id,}, {nodeId: node.id})

  const project = {
    ...projectData,
    id,
  }

  await setProjectData(node, project)

  res.status(200).json({id,})
}

module.exports = createNewProject
