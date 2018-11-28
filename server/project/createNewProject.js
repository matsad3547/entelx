const {
  findByLatLng,
  findClosest,
  createTableRow,
  updateTableRow,
  deleteTableRows,
} = require('../utils/')

const { getDerivedData } = require('../product/')

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

  const timeZone = 'America/Los_Angeles'
  const chargeThreshold = 6.50
  const dischargeThreshold = 6.50

  const manualData = {
    ...data,
    time_zone: timeZone,
    charge_threshold: chargeThreshold,
    discharge_threshold: dischargeThreshold,
  }

  createTableRow('project', manualData)
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
          .then( () => getDerivedData(node, timeZone)
            .then( data => {
              const { timeSeries } = data
              const currentAvg = timeSeries[timeSeries.length - 1].mvgAvg
              return updateTableRow(
                'node',
                {id: node.id},
                {current_avg: currentAvg},
              )
              .then( () => res.status(200).json({id,}) )
              .catch( handleError )
            })
            .catch( handleError )
          )
          .catch( handleError )
      })
      .catch( handleError )
    )
    .catch(err => console.error(`Error at createProject: ${err}`))
}

module.exports = createNewProject
