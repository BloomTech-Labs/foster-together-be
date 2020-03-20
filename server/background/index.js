const { STRIPE } = require('../../env'),
  stripe = require('stripe')(STRIPE),
  router = require('express-promise-router')(),
  { errorHandling } = require('../middlewareAndTools')

module.exports = router

router.get('/', (req, res) => {
  res.send({
    message: 'Hello Stripe checkout server!',
    timestamp: new Date().toISOString(),
  })
})

router.post('/', async (req, res) => {
  const { status } = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'usd',
    payment_method: req.body.payment_method_id,
    confirm: true,
    error_on_requires_action: true,
  })
  res.json(status)
})

router.use(errorHandling)
