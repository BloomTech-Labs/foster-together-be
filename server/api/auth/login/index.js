const router = require('express-promise-router')(),
  { valBody, validatePassword } = require('./middleware'),
  { generateToken } = require('../authTools')

module.exports = router

router.post('/', valBody, validatePassword, (req, res) => {
  const user = req.body.user
  const token = generateToken(user)
  res.json({ first_name: user.first_name, token })
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Login Failure',
    error: err.message.replace(/\\/g, ''),
    token: false,
  })
)
