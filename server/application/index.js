const router = require('express-promise-router')(),
  {
    errorHandling,
    authenticate,
    userOrAdmin,
    onlyAdmin,
  } = require('../middlewareAndTools'),
  { addApp, findApp, changeAppStatus } = require('./model')

router.post('/', authenticate, async (req, res) => {
  await addApp(req.decodedToken.id, req.body)
  res.status(201).json({ message: 'Application successfully submitted.' })
})

router.get('/:id', authenticate, userOrAdmin, async (req, res) =>
  res.json(await findApp({ member_id: req.params.id }))
)

router.put('/:id', authenticate, onlyAdmin, async (req, res) => {
  const { newStatus } = req.body
  // newStatus === 2 &&
  res.json(await changeAppStatus({ member_id: req.params.id }, newStatus))
})

router.use(errorHandling)

module.exports = router
