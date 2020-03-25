const router = require('express-promise-router')(),
  {
    errorHandling,
    authenticate,
    userOrAdmin,
  } = require('../middlewareAndTools'),
  { addApp } = require('./model')

router.post('/', authenticate, async (req, res) => {
  await addApp(req.decodedToken.id, req.body)
  res.status(201).json({ message: 'Application successfully submitted.' })
})

router.get('/:id', authenticate, userOrAdmin, async (req, res) =>
  res.json(await getApp({ member_id: req.params.id }))
)

router.use(errorHandling)

module.exports = router
