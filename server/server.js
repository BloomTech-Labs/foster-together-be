const server = require('express')(),
  json = require('express').json(),
  morgan = require('morgan')('dev'),
  helmet = require('helmet')(),
  cors = require('cors')(),
  loginRouter = require('./login'),
  logoutRouter = require('./logout'),
  registerRouter = require('./registerAdmin'),
  membersRouter = require('./members/member-router'),
  backgroundRouter = require('./background'),
  applyRouter = require('./apply')

server.use(json, morgan, helmet, cors)

server.use('/login', loginRouter)
server.use('/logout', logoutRouter)
server.use('/register', registerRouter)
server.use('/members', membersRouter)
server.use('/background', backgroundRouter)
server.use('/apply', applyRouter)

server.get('/', (req, res) => {
  res.status(200).json({ Server: 'Running' })
})

module.exports = server
