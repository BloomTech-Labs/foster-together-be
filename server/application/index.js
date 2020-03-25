const router = require('express-promise-router')(),
  { errorHandling, authenticate } = require('../middlewareAndTools'),
  { addApp } = require('./model')

router.post('/', authenticate, async (req, res) => {
  await addApp(req.decodedToken.id, req.body)
  res.status(201).json({ message: 'Application successfully submitted.' })
})

router.use(errorHandling)

module.exports = router
