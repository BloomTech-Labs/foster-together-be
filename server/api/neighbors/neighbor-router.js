const router = require('express-promise-router')()

const Neighbors = require('./neighbor-helper.js')

router.post('/', async (req, res) => {
  let neighbor = req.body
  const saved = await Neighbors.add(neighbor)
  res.status(201).json({ message: 'Neighbor successfully added.', saved })
})

router.get('/', async (req, res) => {
  const neighbor = await Neighbors.find()
  res.status(200).json(user)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const neighbor = await Neighbors.findById(id)
  res.status(200).json(neighbor)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const neighbor = req.body
  const updated = await Neighbors.update(id, neighbor)
  res.status(201).json(updated)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const deleted = await Neighbors.remove(id)
  res.status(200).json({ message: 'Neighbor successfully deleted.', deleted })
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Uh Oh! 500 Error!',
    error: err.message.replace(/\\/g, ''),
  })
)
