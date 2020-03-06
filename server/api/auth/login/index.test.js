const server = require('../../../../index'),
  request = require('supertest'),
  db = require('../../../../db/dbConfig')

describe('/login', () => {
  beforeAll(async () => await db.seed.run())
  describe('with correct request body', () => {
    test('returns a status of 201, a message, and a token', async () => {
      const res = await request(server)
        .post('/api/login')
        .send({ username: 'blahblah', password: 'blahblah' })

      expect(res.status).toBe(200)

      expect(JSON.parse(res.text).message).toBe('blahblah logged in!')

      expect(JSON.parse(res.text).token).toBeTruthy()
    })
  })

  describe('with missing request body', () => {
    test('returns a status of 500, a message, error, and no token', async () => {
      const res = await request(server).post('/api/login')

      expect(res.status).toBe(500)

      expect(JSON.parse(res.text).message).toBe('Uh Oh! 500 Error!')

      expect(JSON.parse(res.text).error).toBe(
        'Must send both a username and a password'
      )

      expect(JSON.parse(res.text).token).toBeFalsy()
    })
  })
})
