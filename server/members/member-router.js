const router = require('express-promise-router')(),
  {
    errorHandling,
    validateId,
    hashPassword,
    generateToken,
    authenticate,
  } = require('../middlewareAndTools'),
  { validateMemberBody, userOrAdmin } = require('./middleware'),
  Members = require('./member-helper.js')

router.post(
  '/:membertype',
  validateMemberBody,
  hashPassword,
  async (req, res) => {
    const { membertype } = req.params
    const { id } = await Members.add(membertype, req.body)
    const token = generateToken({ id, membertype })
    const saved = await Members.find({ 'm.id': id })
    res
      .status(201)
      .json({ message: 'Member successfully added.', saved, token })
  }
)

router.get('/', authenticate, async (req, res) => {
  const members = await Members.find(req.query)
  res.json(members)
})

router.get('/:id', validateId, authenticate, userOrAdmin, async (req, res) => {
  const { id } = req.params
  const member = (await Members.find({ 'm.id': id }))[0]
  res.json(member)
})

router.put(
  '/:id',
  validateMemberBody,
  validateId,
  authenticate,
  userOrAdmin,
  async (req, res) => {
    const { id } = req.params
    const updated = await Members.update(id, req.body)
    res.json(updated)
  }
)

router.delete(
  '/:id',
  validateId,
  authenticate,
  userOrAdmin,
  async (req, res) => {
    const { id } = req.params
    await Members.remove(id)
    res.json({ message: 'Member successfully deleted.' })
  }
)

router.use(errorHandling)

module.exports = router
