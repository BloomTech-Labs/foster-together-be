const router = require('express-promise-router')(),
  {
    errorHandling,
    validateId,
    hashPassword,
    generateToken,
    authenticate,
    userOrAdmin,
    onlyAdmin,
  } = require('../middlewareAndTools'),
  { validateMemberBody } = require('./middleware'),
  Members = require('./member-helper.js')

router.post(
  '/:membertype',
  validateMemberBody,
  hashPassword,
  async (req, res) => {
    const { membertype } = req.params
    const { id } = await Members.add(membertype, req.body)
    const token = generateToken({ id, membertype })
    const user = (await Members.find({ 'm.id': id }))[0]
    res.status(201).json({ message: 'Member successfully added.', user, token })
  }
)

router.get('/', authenticate, onlyAdmin, async (req, res) =>
  res.json(await Members.find(req.query))
)

router.get('/:id', validateId, authenticate, userOrAdmin, async (req, res) =>
  res.json((await Members.find({ 'm.id': req.params.id }))[0])
)

router.put(
  '/:id',
  validateMemberBody,
  validateId,
  authenticate,
  userOrAdmin,
  async (req, res) => res.json(await Members.update(req.params.id, req.body))
)

router.delete(
  '/:id',
  validateId,
  authenticate,
  userOrAdmin,
  async (req, res) => {
    await Members.remove(req.params.id)
    res.json({ message: 'Member successfully deleted.' })
  }
)

router.use(errorHandling)

module.exports = router
