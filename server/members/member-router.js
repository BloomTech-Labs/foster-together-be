const router = require('express-promise-router')(),
  validateId = require('../../middleware/validate-id.js'),
  validateSignup = require('../../middleware/validate-signup.js'),
  { errorHandling } = require('../middleware'),
  Members = require('./member-helper.js')

router.post('/:membertype', validateSignup, async (req, res) => {
  const { membertype } = req.params
  const { id } = await Members.add(membertype, req.body)
  const saved = await Members.findBy(membertype, ['id', id])
  res.status(201).json({ message: 'Member successfully added.', saved })
})

router.get('/', async (req, res) => {
  const allMembers = await Members.find()
  res.status(200).json(allMembers)
})

router.get('/:membertype', async (req, res) => {
  const { membertype } = req.params
  const allMemberType = await Members.findMembertype(membertype)
  res.status(200).json(allMemberType)
})

router.get('/:membertype/:id', validateId(), async (req, res) => {
  const { membertype, id } = req.params
  const member = (await Members.findBy(membertype, ['id', id]))[0]
  res.status(200).json(member)
})

router.put('/:membertype/:id', validateId(), async (req, res) => {
  const { membertype, id } = req.params
  const updated = await Members.update(membertype, id, req.body)
  res.status(200).json(updated)
})

router.delete('/:membertype/:id', validateId(), async (req, res) => {
  const { membertype, id } = req.params
  await Members.remove(membertype, id)
  res.status(200).json({ message: 'Member successfully deleted.' })
})

router.use(errorHandling)

module.exports = router
