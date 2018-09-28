const knex = require('knex')(require('./knexfile'))
const crypto = require('crypto')

const randomString = () => crypto.randomBytes(4).toString('hex')

const saltHashPassword = ({
  password,
  salt = randomString(),
}) => {

  const hash = crypto
                .createHmac('sha512', salt)
                .update(password)

  return {
    salt,
    hash: hash.digest('hex')
  }
}

const createUser = ({ username, password }) => {
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

const authenticate = ({ username, password }) => {
  console.log(`Authenticating user ${username}`)
  return knex('user')
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
          .catch( err => console.error(`Error at store.authenticate: ${err}`))
}

module.exports = {
  saltHashPassword,
  createUser,
  authenticate,
}
