const server = require('../server'),
  request = require('supertest'),
  db = require('../../data/db-config')

describe('/application', () => {
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
        .post('/application')
        .set('authorization', token)
        .send({
          app_q1_a: {
            option_1: true,
            option_2: false,
            option_3: true,
            option_4: false, // checkboxes
          },
          app_q1_b: 'app_q1_b test 1', // optional referral name
          app_q2: {
            option_1: false,
            option_2: true,
            option_3: false,
            option_4: true,
            option_5: false, // checkboxes
          },
          app_q3: true, // yes or no
          app_q4: 2, // 1-3, yes/no/maybe
          app_q5: 'app_q5 test 1', // experience with kids
          app_q6_a: false, // yes or no
          app_q6_b: {
            answer_a: 'answer_a',
            answer_b: 'answer_b',
            answer_c: 'answer_c', // list of certications/licenses
          },
        })

      expect(JSON.parse(res.text).error).toBe(undefined)

      expect(res.status).toBe(201)

      expect(JSON.parse(res.text).message).toBe(
        'Application successfully submitted.'
      )
    })
  })
  describe(`GET '/:id'`, () => {
    test('should return application and status 200', async () => {
      const res = await request(server)
        .get('/application/4')
        .set('authorization', token)

      expect(JSON.parse(res.text).error).toBe(undefined)

      expect(res.status).toBe(200)

      expect(JSON.parse(res.text)).toMatchObject({
        app_q1_a: {
          option_1: true,
          option_2: false,
          option_3: true,
          option_4: false,
        },
        app_q1_b: 'app_q1_b test 1',
        app_q2: {
          option_1: false,
          option_2: true,
          option_3: false,
          option_4: true,
          option_5: false,
        },
        app_q3: { answer: true },
        app_q4: { answer: 2 },
        app_q5: 'app_q5 test 1',
        app_q6_a: { answer: false },
        app_q6_b: {
          answer_a: 'answer_a',
          answer_b: 'answer_b',
          answer_c: 'answer_c',
        },
        app_status: 'Not yet reviewed',
      })
    })
  })
})
