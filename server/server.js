const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const server = express()
const familyRouter = './router/families/familyRouter.js'

server.get('/', (req, res) => {
  res.status(200).json({ Server: 'Running' })
})

server.use(helmet())
server.use(cors())
server.use(express.json())
// server.use('/api', familyRouter)
module.exports = server
