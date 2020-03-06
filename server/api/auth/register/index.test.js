const server = require('../../../../index'),
  request = require('supertest'),
  db = require('../../../../db/dbConfig')

describe('/register', () => {
  beforeAll(
    async () =>
      await db('users')
        .where('username', 'atestuser2')
        .del()
  )
  describe('with correct request body', () => {
    test('returns a status of 201, a message, and a token', async () => {
      const res = await request(server)
        .post('/api/register')
        .send({
          email: 'atest2@email.com',
          username: 'atestuser2',
          password: 'atestpassword',
        })

      expect(res.status).toBe(201)

      expect(JSON.parse(res.text).message).toBe(
        'atestuser2 successfully created!'
      )

      expect(JSON.parse(res.text).token).toBeTruthy()
    })
  })

  describe('with missing request body', () => {
    test('returns a status of 500, a message, error, and no token', async () => {
      const res = await request(server).post('/api/register')

      expect(res.status).toBe(500)

      expect(JSON.parse(res.text).message).toBe('Uh Oh! 500 Error!')

      expect(JSON.parse(res.text).error).toBe(
        'Must send username, password and email address!'
      )

      expect(JSON.parse(res.text).token).toBeFalsy()
    })
  })
})
