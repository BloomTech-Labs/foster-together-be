const router = require('express-promise-router')(),
  { valBody, validatePassword } = require('./middlewareAndTools'),
  { errorHandling, generateToken } = require('../middlewareAndTools')

module.exports = router

router.post('/', valBody, validatePassword, async (req, res) => {
  const token = generateToken(req.body.user)
  res.json({ ...req.body.user, token })
})

router.use(errorHandling)
