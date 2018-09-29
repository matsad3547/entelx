const authenticateUser = require('./dbConnections/authenticateUser')

const login = (req, res) => {

  authenticateUser({
      username: req.body.username,
      password: req.body.password,
    })
    .then( ({ success }) => success ? res.sendStatus(200) : res.sendStatus(401) )
    .catch( err => console.error(`Error at login: ${err}`))
}

module.exports = login
