const server = require('../server'),
  request = require('supertest'),
  db = require('../../data/db-config')

describe('/apply', () => {
  let token

  beforeAll(async done => {
    await db.seed.run()
    request(server)
      .post('/login')
      .send({
        email: 'GreceMana@yahoo.com',
        password: 'eric',
      })
      .end((err, response) => {
        token = response.body.token // save the token!
        done()
      })
  })

  describe(`POST '/'`, () => {
    test('should respond with a status 201 and a json message for success', async () => {
      const res = await request(server)
        .post('/apply')
        .set('authorization', token)
        .send({
          app_q1: 'test q1',
          app_q2: {
            option_1: true,
            option_2: false,
            option_3: true,
            option_4: false,
            option_5: true,
          },
          app_q3: true,
          app_q4: { option_1: false, option_2: false },
          app_q5: 1,
          app_q6: 'test q6',
          app_q7: 'test q7',
          app_q8: 'test q8',
        })

      expect(JSON.parse(res.text).error).toBe(undefined)

      expect(res.status).toBe(201)

      expect(JSON.parse(res.text).message).toBe(
        'Application successfully submitted.'
      )
    })
  })
})
