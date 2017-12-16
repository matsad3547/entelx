const store = require('../store')

const createUser = (req, res) => {

  store
    .createUser({
      username: req.body.username,
      password: req.body.password,
    })
    .then( () => res.sendStatus(200))
    .catch( err => console.error(`Error at createUser: ${err}`))
}

module.exports = createUser
