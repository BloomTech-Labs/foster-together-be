const router = require('express-promise-router')()

const validateId = require('../../../middleware/validate-id.js')
const validateSignup = require('../../../middleware/validate-signup.js')

const Members = require('./member-helper.js')

router.post('/:membertype', validateSignup, async (req, res) => {
  let member = req.body
  const saved = await Members.add(member)
  res.status(201).json({ message: 'Member successfully added.', saved })
})

router.get('/', async (req, res) => {
  const member = await Members.find()
  res.status(200).json(member)
})

router.get('/:membertype', async (req, res) => {
  const member = await Members.find()
  res.status(200).json(member)
})

router.get('/:membertype/:id', validateId(), async (req, res) => {
  const { id } = req.params
  const member = await Members.findById(id)
  res.status(200).json(member)
})

router.put('/:membertype/:id', validateId(), async (req, res) => {
  const { id } = req.params
  const member = req.body
  const updated = await Members.update(id, member)
  res.status(200).json(updated)
})

router.delete('/:membertype/:id', validateId(), async (req, res) => {
  const { id } = req.params
  const deleted = await Members.remove(id)
  res.status(200).json({ message: 'Member successfully deleted.', deleted })
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Uh Oh! 500 Error!',
    error: err.message.replace(/\\/g, ''),
  })
)

module.exports = router
