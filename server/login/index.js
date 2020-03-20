const router = require('express-promise-router')(),
  { valBody, validatePassword } = require('./middleware'),
  { errorHandling, generateToken } = require('../middlewareAndTools')

module.exports = router

router.post('/', valBody, validatePassword, (req, res) => {
  const { id, membertype } = req.body.user
  const token = generateToken(req.body.user)
  res.json({ id, membertype, token })
})

router.use(errorHandling)
