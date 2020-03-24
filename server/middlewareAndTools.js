const jwt = require('jsonwebtoken'),
  { JWT_SECRET } = require('../env'),
  bcrypt = require('bcryptjs'),
  db = require('../data/db-config.js')

// Check if a members ID is valid.
const validateId = async (req, res, next) => {
  const { id } = req.params
  const resource = await db('members')
    .where('id', id)
    .first()
  if (!resource) {
    res.status(400).json({ message: 'Invalid ID.' })
  } else {
    req.resource = resource
    next()
  }
}

// Check if token is valid and attach decoded info
const authenticate = (req, res, next) => {
  const token = req.headers.authorization
  if (!token)
    return res
      .status(401)
      .json({ message: 'Authentication Failure', token: false })
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err)
      return res
        .status(401)
        .json({ message: 'Authentication Failure', token: false })
    req.decodedToken = decodedToken
    next()
  })
}

// Generate a new token
const generateToken = userInfo => {
  const payload = {
    ...userInfo,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

// Hashes a password to be saved
const hashPassword = (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 14)
  next()
}

// Custom error handler
const errorHandling = (err, req, res, next) =>
  res.status(500).json({
    message: 'Uh Oh! 500 Error!',
    error: err.message.replace(/\\/g, ''),
  })

module.exports = {
  authenticate,
  errorHandling,
  validateId,
  generateToken,
  hashPassword,
}
