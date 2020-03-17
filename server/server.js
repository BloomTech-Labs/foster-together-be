const express = require('express')
const configMiddleware = require('../middleware')
const server = express()

configMiddleware(server)

server.use('/api', apiRouter)

server.get('/', (req, res) => {
  res.status(200).json({ Server: 'Running' })
})
module.exports = server
