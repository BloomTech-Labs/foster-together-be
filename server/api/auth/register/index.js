const router = require('express-promise-router')(),
  { valBody, hashPassword } = require('./middleware'),
  { addAdmin } = require('./model'),
  { generateToken } = require('../authTools')

module.exports = router

router.post('/', valBody, hashPassword, async (req, res) => {
  const admin = await addAdmin(req.body)
  console.log(admin)
  const token = generateToken(admin)
  res.status(201).json({ admin, token })
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Registration Failure',
    error: err.message.replace(/\\/g, ''),
    token: false,
  })
)
