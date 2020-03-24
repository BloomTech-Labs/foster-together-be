const server = require('../server'),
  request = require('supertest'),
  db = require('../../data/db-config')

describe('/register', () => {
  let token

  beforeAll(async done => {
    await db.seed.run()
    request(server)
      .post('/login')
      .send({
        email: 'hope@email.com',
        password: 'hope',
      })
      .end((err, response) => {
        token = response.body.token // save the token!
        done()
      })
  })

  describe('with correct request body', () => {
    test('returns a status of 201, a message, and a token', async () => {
      const res = await request(server)
        .post('/register')
        .set('authorization', token)
        .send({
          email: 'atest2@email.com',
          first_name: 'test',
          password: 'atestpassword',
        })

      expect(JSON.parse(res.text).error).toBe(undefined)

      expect(JSON.parse(res.text).message).toBe('test added successfully!')

      expect(res.status).toBe(201)
    })
  })

  describe('with missing request body', () => {
    test('returns a status of 500, a message, error, and no token', async () => {
      const res = await request(server)
        .post('/register')
        .set('authorization', token)

      expect(JSON.parse(res.text).message).toBe('Uh Oh! 500 Error!')

      expect(JSON.parse(res.text).error).toBe(
        'Must send first_name, password and email address!'
      )

      expect(JSON.parse(res.text).token).toBeFalsy()

      expect(res.status).toBe(500)
    })
  })
})
