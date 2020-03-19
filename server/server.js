const express = require('express'),
  configMiddleware = require('../middleware'),
  server = express(),
  loginRouter = require('./auth/login'),
  logoutRouter = require('./auth/logout'),
  registerRouter = require('./auth/register'),
  membersRouter = require('./members/member-router'),
  stripeRouter = require('./stripe')

configMiddleware(server)

server.use('/login', loginRouter)
server.use('/logout', logoutRouter)
server.use('/register', registerRouter)
server.use('/members', membersRouter)
server.use('/stripe', stripeRouter)

server.get('/', (req, res) => {
  res.status(200).json({ Server: 'Running' })
})

module.exports = server
