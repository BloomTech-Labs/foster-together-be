const router = require('express-promise-router')(),
  { valBody } = require('./middleware'),
  { addAdmin } = require('./model'),
  {
    errorHandling,
    hashPassword,
    generateToken,
  } = require('../middlewareAndTools')

module.exports = router

router.post('/', valBody, hashPassword, async (req, res) => {
  const admin = await addAdmin(req.body)
  const token = generateToken(admin)
  res.status(201).json({ first_name: admin.first_name, token })
})

router.use(errorHandling)
