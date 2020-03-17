const router = require('express-promise-router')(),
  { valBody, hashPassword } = require('./middleware'),
  { addAdmin } = require('./model'),
  { generateToken } = require('../authTools'),
  { errorHandling } = require('../../middleware')

module.exports = router

router.post('/', valBody, hashPassword, async (req, res) => {
  const admin = await addAdmin(req.body)
  const token = generateToken(admin)
  res.status(201).json({ first_name: admin.first_name, token })
})

router.use(errorHandling)
