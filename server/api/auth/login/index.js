const router = require('express-promise-router')(),
  { valBody, validatePassword } = require('./middleware'),
  { generateToken } = require('../authTools')

module.exports = router

router.post('/', valBody, validatePassword, (req, res) => {
  const token = generateToken(req.body.user)
  res.json({
    message: `${req.body.user.username} logged in!`,
    token,
  })
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Uh Oh! 500 Error!',
    error: err.message.replace(/\\/g, ''),
    token: false,
  })
)
