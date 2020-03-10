const server = require('../../../server'),
  request = require('supertest'),
  db = require('../../../../data/db-config')

describe('/register', () => {
  beforeAll(() => db.seed.run())

  describe('with correct request body', () => {
    test('returns a status of 201, a message, and a token', async () => {
      const res = await request(server)
        .post('/api/register')
        .send({
          email: 'atest2@email.com',
          first_name: 'test',
          password: 'atestpassword',
        })

      expect(JSON.parse(res.text).error).toBe(undefined)

      expect(JSON.parse(res.text).first_name).toBe('test')

      expect(JSON.parse(res.text).token).toBeTruthy()

      expect(res.status).toBe(201)
    })
  })

  describe('with missing request body', () => {
    test('returns a status of 500, a message, error, and no token', async () => {
      const res = await request(server).post('/api/register')

      expect(JSON.parse(res.text).message).toBe('Registration Failure')

      expect(JSON.parse(res.text).error).toBe(
        'Must send first_name, password and email address!'
      )

      expect(JSON.parse(res.text).token).toBeFalsy()

      expect(res.status).toBe(500)
    })
  })
})
