const server = require('../../../server'),
  request = require('supertest')

describe('/logout', () => {
  test('returns a status of 201, a message, and a token', async () => {
    const res = await request(server).get('/api/logout')
    expect(res.status).toBe(200)

    expect(JSON.parse(res.text).message).toBe('You have been logged out!')

    expect(JSON.parse(res.text).token).toBeFalsy()
  })
})
