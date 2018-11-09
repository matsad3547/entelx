const db = require('../../store')
const { saltHashPassword } = require('../utils')

const addUser = ({ username, password }) => {
  console.log(`Add user ${username}`)
  const { salt, hash } = saltHashPassword({password})
  return db('user')
          .insert({
            salt,
            encrypted_password: hash,
            username,
          })
          .debug()
          .catch( err => console.error(`Error at addUser: ${err}`))
}

module.exports = addUser
