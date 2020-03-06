const router = require('express-promise-router')(),
  { valBody, hashPassword } = require('./middleware'),
  { addUser } = require('./model'),
  { generateToken } = require('../authTools')

module.exports = router

router.post('/', valBody, hashPassword, async (req, res) => {
  const user = await addUser(req.body)
  const token = generateToken(user)
  res.status(201).json({
    message: `${user.username} successfully created!`,
    token: token,
  })
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Uh Oh! 500 Error!',
    error: err.message.replace(/\\/g, ''),
    token: false,
  })
)
