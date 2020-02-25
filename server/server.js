const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const server = express()

const apiRouter = require('./api/api-router.js')

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api', familyRouter)

server.get('/', (req, res) => {
  res.status(200).json({ Server: 'Running' })
})

module.exports = server
