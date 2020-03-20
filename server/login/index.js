const router = require('express-promise-router')(),
  { valBody, validatePassword } = require('./middleware'),
  { errorHandling, generateToken } = require('../middlewareAndTools')

module.exports = router

router.post('/', valBody, validatePassword, (req, res) => {
  const { user_type, first_name } = req.body.user
  const token = generateToken(req.body.user)
  res.json({ first_name, user_type, token })
})

router.use(errorHandling)
