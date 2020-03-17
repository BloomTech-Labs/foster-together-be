const server = require('../../../server'),
  request = require('supertest'),
  db = require('../../../../data/db-config')

describe('/login', () => {
  beforeAll(async () => await db.seed.run())
  describe('with correct request body', () => {
    test('returns a status of 200, a message, and a token', async () => {
      const res = await request(server)
        .post('/api/login')
        .send({ email: 'hope@email.com', password: 'hopehope' })

      expect(JSON.parse(res.text).error).toBe(undefined)

      expect(JSON.parse(res.text).first_name).toBe('Hope')

      expect(JSON.parse(res.text).token).toBeTruthy()

      expect(res.status).toBe(200)
    })
  })

  describe('with missing request body', () => {
    test('returns a status of 500, a message, error, and no token', async () => {
      const res = await request(server).post('/api/login')

      expect(JSON.parse(res.text).error).toBe(
        'Must send both an email and a password'
      )

      expect(JSON.parse(res.text).message).toBe('Login Failure')

      expect(JSON.parse(res.text).token).toBeFalsy()

      expect(res.status).toBe(500)
    })
  })
})
