const {
  findByLatLng,
  findClosest,
  createTableRow,
  updateTableRow,
  deleteTableRows,
} = require('../utils/')

const { setDerivedData } = require('../product/')

const handleError = err => {
  throw err
}

const createNewProject = (req, res) => {
  const { type } = req.body
  // TODO add validation for request here
  if(type === 'demo') {
    //just want to have just one demo project at a time
    return deleteTableRows('project', {type: 'demo'})
      .then( () => createProject(req.body, res) )
  }
  else {
    return createProject(req.body, res)
  }
}

const createProject = (data, res) => {

  const {
    lat,
    lng,
  } = data

  // TODO Get timezone from this way: https://www.mapbox.com/help/create-a-timezone-finder-with-mapbox-tilequery-api/

  const timeZone = 'America/Los_Angeles'

  // TODO calculate charge and discharge thresholds from data
  const chargeThreshold = 6.50
  const dischargeThreshold = 6.50

  const manualData = {
    ...data,
    time_zone: timeZone,
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
            {node_id: node.id},
          )
          .then( () => setDerivedData(node, id, timeZone)
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
