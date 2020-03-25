const { addApp } = require('./model'),
  db = require('../../data/db-config.js')

describe('db functions for application', () => {
  beforeAll(async () => await db.seed.run())
  test('should add an application to the database', async () => {
    const first = await addApp(4, {
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
    expect(first.id).toBe(1)
    const second = await addApp(6, {
      app_q1_a: {
        option_1: false,
        option_2: false,
        option_3: false,
        option_4: false, // checkboxes
      },
      app_q1_b: '', // optional referral name
      app_q2: {
        option_1: false,
        option_2: false,
        option_3: false,
        option_4: false,
        option_5: false, // checkboxes
      },
      app_q3: false, // yes or no
      app_q4: 1, // 1-3, yes/no/maybe
      app_q5: '', // experience with kids
      app_q6_a: false, // yes or no
      app_q6_b: {
        answer_a: '',
        answer_b: '',
        answer_c: '', // list of certications/licenses
      },
    })
    expect(second.id).toBe(2)
  })
})
