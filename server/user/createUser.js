const addUser = require('./dbConnections/addUser')

const createUser = (req, res) => {

  addUser({
    username: req.body.username,
    password: req.body.password,
  })
    .then( () => res.sendStatus(200))
    .catch( err => console.error(`Error at createUser: ${err}`))
}

module.exports = createUser
