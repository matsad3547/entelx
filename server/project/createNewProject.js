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

const createNewProject = (req, res, next) => {
  const { type } = req.body
  // TODO add validation for request here
  if(type === 'demo') {
    //just want to have just one demo project at a time
    return deleteTableRows('project', {type: 'demo'})
      .then( () => createProject(req.body, res, next) )
  }
  else {
    return createProject(req.body, res, next)
  }
}

const createProject = (data, res) => {

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

  return createTableRow('project', manualData)
    .then( id => id[0] )
    .then( id => findByLatLng(
        'node',
        lat,
        lng
      )
      .then( matches => {
        const node = findClosest(lat, lng, matches)
        return updateTableRow(
            'project',
            {id,},
            {nodeId: node.id},
          )
          .then( () => setProjectData(node, id, timeZone)
            .then( () => res.status(200).json({id,}) )
            .catch( handleError ) )
          .catch( handleError )
        })
      .catch( handleError )
      )
    .catch(err => {
      console.error(`Error at createProject: ${err}`)
      next(err)
    })
}

module.exports = createNewProject
