const router = require('express').Router()

const neighborRouter = require('./neighbors/neighbor-router.js')
const familyRouter = require('./families/family-router.js')

router.use('/neighbors', neighborRouter)
router.use('/families', familyRouter)

module.exports = router
