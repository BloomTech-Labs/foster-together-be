const router = require('express-promise-router')(),
  { valBody } = require('./middleware'),
  { addAdmin } = require('./model'),
  {
    errorHandling,
    hashPassword,
    authenticate,
  } = require('../middlewareAndTools')

module.exports = router

router.post('/', authenticate, valBody, hashPassword, async (req, res) => {
  if (req.decodedToken.type === 'admins')
    res.status(201).json({
      message: `${
        (await addAdmin(req.body))['first_name']
      } added successfully!`,
    })
  else res.status(401).json({ message: 'Authentication Failure', token: false })
})

router.use(errorHandling)
