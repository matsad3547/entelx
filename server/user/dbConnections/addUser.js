const knex = require('../../store')
const { saltHashPassword } = require('../utils')

const addUser = ({ username, password }) => {
  console.log(`Add user ${username}`)
  const { salt, hash } = saltHashPassword({password})
  return knex('user')
          .insert({
            salt,
            encrypted_password: hash,
            username,
          })
          .debug()
          .catch( err => console.error(`Error at store.createUser: ${err}`))
}

module.exports = addUser
