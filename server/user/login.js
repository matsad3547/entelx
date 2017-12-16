const store = require('../store')

const login = (req, res) => {

  store
    .authenticate({
      username: req.body.username,
      password: req.body.password,
    })
    .then( ({ success }) => {
      if (success) {
        res.sendStatus(200)
      }
      else {
        res.sendStatus(401)
      }
    })
    .catch( err => console.error(`Error at login: ${err}`))
}

module.exports = login
