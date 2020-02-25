const router = require('express').Router()

const neighborRouter = require('./neighbors/neighbor-router.js')
const familyRouter = require('./families/family-router.js')
const adminRouter = require('./admin/admin-helper')

router.use('/neighbors', neighborRouter)
router.use('/families', familyRouter)
router.use('/admins', adminRouter)

module.exports = router
