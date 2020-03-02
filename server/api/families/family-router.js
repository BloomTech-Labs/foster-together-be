const router = require('express-promise-router')()

const validateId = require('../../../middleware/validate-id.js')
const validateSignup = require('../../../middleware/validate-signup.js')

const Families = require('./family-helper.js')

router.post('/', validateSignup, async (req, res) => {
  let family = req.body
  const saved = await Families.add(family)
  res.status(201).json({ message: 'Family successfully added.', saved })
})

router.get('/', async (req, res) => {
  const families = await Families.find()
  res.status(200).json(families)
})

router.get('/:id', validateId('families', 'family_id'), async (req, res) => {
  const { id } = req.params
  const family = await Families.findById(id)
  res.status(200).json(family)
})

router.put('/:id', validateId('families', 'family_id'), async (req, res) => {
  const { id } = req.params
  const family = req.body
  const updated = await Families.update(id, family)
  res.status(200).json(updated)
})

router.delete('/:id', validateId('families', 'family_id'), async (req, res) => {
  const { id } = req.params
  const deleted = await Families.remove(id)
  res.status(200).json({ message: 'family successfully deleted.', deleted })
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Uh Oh! 500 Error!',
    error: err.message.replace(/\\/g, ''),
  })
)

module.exports = router
