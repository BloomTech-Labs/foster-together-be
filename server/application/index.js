const router = require('express-promise-router')(),
  {
    errorHandling,
    authenticate,
    userOrAdmin,
    onlyAdmin,
    validateId,
  } = require('../middlewareAndTools'),
  Members = require('../members/member-helper'),
  { email } = require('./email'),
  { addApp, findApp, changeAppStatus } = require('./model')

router.post('/', authenticate, async (req, res) => {
  await addApp(req.decodedToken.id, req.body)
  res.status(201).json({ message: 'Application successfully submitted.' })
})

router.get('/:id', authenticate, validateId, userOrAdmin, async (req, res) =>
  res.json(await findApp({ member_id: req.params.id }))
)

router.put('/:id', authenticate, validateId, onlyAdmin, async (req, res) => {
  const { newStatus } = req.body
  const { id } = req.params
  const member = (await Members.find({ 'm.id': id }))[0]
  await email(newStatus, member)
  res.json(await changeAppStatus({ member_id: id }, newStatus))
})

router.use(errorHandling)

module.exports = router
