const {
  findByLatLng,
  findClosest,
  createTableRow,
  updateTableRow,
  deleteTableRows,
} = require('../utils/')

const { getRunningAverage } = require('../processes/')

const handleError = err => {
  throw err
}

const createNewProject = (req, res) => {
  const { type } = req.body
  // TODO add validation for request here
  if(type === 'demo') {
    //just want to have just one demo project at a time
    deleteTableRows('project', {type: 'demo'})
      .then( () => createProject(req.body, res) )
  }
  else {
    createProject(req.body, res)
  }
}


const createProject = (data, res) => {

  const {
    lat,
    lng,
  } = data

  createTableRow('project', data)
    .then( id => id[0] )
    .then( id => findByLatLng('node', lat, lng)
      .then( matches => {
        const node = findClosest(lat, lng, matches)
        updateTableRow('project', {id,}, {node_id: node.id})
          .then( () => res.status(200).json({id,}))
          .then( () => {
            console.log('at then?');
            getRunningAverage(node)
              .then( arr => {
                const currentAvg = arr[arr.length - 1].mvgAvg
                
              })
          })
          .catch( handleError )
      })
      .catch( handleError )
    )
    .catch(err => console.error(`Error at createProject: ${err}`))
}

module.exports = createNewProject
