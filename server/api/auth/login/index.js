const router = require('express-promise-router')(),
  { valBody, validatePassword } = require('./middleware'),
  { generateToken } = require('../authTools')

module.exports = router

router.post('/', valBody, validatePassword, (req, res) => {
  const { user_type, first_name } = req.body.user
  const token = generateToken(req.body.user)
  res.json({ first_name, user_type, token })
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Login Failure',
    error: err.message.replace(/\\/g, ''),
    token: false,
  })
)
