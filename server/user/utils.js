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

module.exports = {
  saltHashPassword,
}
