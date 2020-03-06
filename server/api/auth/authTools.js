const jwt = require('jsonwebtoken'),
  db = require('../../../db/dbConfig'),
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

const findUser = async user =>
  await db('users')
    .where('username', user)
    .first()

module.exports = { generateToken, findUser }
