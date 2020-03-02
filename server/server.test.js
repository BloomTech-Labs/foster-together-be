const server = require('./server'),
  request = require('supertest')

describe('server runs successfully', () => {
  test('a get to main server should return json object', async () => {
    const res = await request(server).get('')

    expect(res.status).toBe(200)
    expect(JSON.parse(res.text)).toMatchObject({ Server: 'Running' })
  })
})
