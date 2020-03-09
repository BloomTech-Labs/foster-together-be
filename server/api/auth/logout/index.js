const router = require('express-promise-router')()

module.exports = router

router.get('/', (req, res) => {
  res.json({
    message: `You have been logged out!`,
    token: false,
  })
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Uh Oh! 500 Error!',
    error: err.message.replace(/\\/g, ''),
    token: false,
  })
)
