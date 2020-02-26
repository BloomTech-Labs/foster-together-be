const router = require('express-promise-router')()

const admins = require('./admin-helper')

router.post('/login', async (req, res) => {
  const email = req.body
  const login = await admins.findby(email)
  res.status(200).json({ login })
})

router.post('/', async (req, res) => {
  const admin = req.body
  const addAdmin = await admins.add(admin)
  res.status(201).json({ addAdmin })
})

router.delete('/', async (req, res) => {
  const { id } = req.params
  const deleted = await admins.adminDelete(id)
  res.status(200).json({ deleted })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const admin = await admins.findById(id)
  res.status(200).json(admin)
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Uh Oh! 500 Error!',
    error: err.message.replace(/\\/g, ''),
  })
)

module.exports = router
