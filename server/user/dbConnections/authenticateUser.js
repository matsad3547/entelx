const db = require('../../store')

const { saltHashPassword } = require('../utils')

const authenticateUser = ({ username, password }) => {
  console.log(`Authenticating user ${username}`)
  return db('user')
          .where({ username })
          .then( ([user]) => {
            if(!user) {
              return {
                success: false,
              }
            }
            else {
              const { hash } = saltHashPassword({
                password,
                salt: user.salt,
              })
              //TODO add fixed time comparison
              return {
                success: hash === user.encrypted_password,
              }
            }
          })
          .catch( err => console.error(`Error at authenticateUser: ${err}`))
}

module.exports = authenticateUser
