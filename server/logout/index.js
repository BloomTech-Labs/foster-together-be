const router = require('express-promise-router')(),
  { errorHandling } = require('../middlewareAndTools')

module.exports = router

router.get('/', (req, res) => {
  res.json({
    message: `You have been logged out!`,
    token: false,
  })
})

router.use(errorHandling)
