const jwt = require('jsonwebtoken'),
  { JWT_SECRET } = require('../../../env')

const generateToken = user => {
  const payload = {
    ...user,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = { generateToken }
