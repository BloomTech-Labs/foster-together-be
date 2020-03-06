const router = require('express').Router(),
  neighborRouter = require('./neighbors/neighbor-router.js'),
  familyRouter = require('./families/family-router.js'),
  adminRouter = require('./admin/admin-router'),
  loginRouter = require('./auth/login'),
  logoutRouter = require('./auth/logout'),
  registerRouter = require('./auth/register')

router.use('/neighbors', neighborRouter)
router.use('/families', familyRouter)
router.use('/admins', adminRouter)
router.use('/login', loginRouter)
router.use('/logout', logoutRouter)
router.use('/register', registerRouter)

module.exports = router
