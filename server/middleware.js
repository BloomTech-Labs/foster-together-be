const jwt = require('jsonwebtoken'),
  { JWT_SECRET } = require('../env')

const authenticate = (req, res, next) => {
  const token = req.headers.Authorization
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

const errorHandling = (err, req, res, next) =>
  res.status(500).json({
    message: 'Uh Oh! 500 Error!',
    error: err.message.replace(/\\/g, ''),
  })

module.exports = { authenticate, errorHandling }
