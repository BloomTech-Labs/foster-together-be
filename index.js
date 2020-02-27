const env = require('./env.js')
const Sentry = require('@sentry/node')

const server = require('./server/server')
const PORT = env.PORT || 7000

Sentry.init({
  dsn: 'https://23bb508df01e4829bcdf6578db36ceed@sentry.io/2717223',
})

server.listen(PORT, () => {
  console.log(`\n=== listening on ${PORT} ===\n`)
})
