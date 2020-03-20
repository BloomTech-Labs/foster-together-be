const router = require('express-promise-router')(),
  {
    valBody,
    validatePassword,
    getUserDetails,
  } = require('./middlewareAndTools'),
  { errorHandling, generateToken } = require('../middlewareAndTools')

module.exports = router

router.post('/', valBody, validatePassword, async (req, res) => {
  const { id, membertype } = req.body.user
  const token = generateToken(req.body.user)
  const details = await getUserDetails(id, membertype)
  res.json({ id, membertype, ...details, token })
})

router.use(errorHandling)
