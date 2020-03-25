const { addApp } = require('./model')
describe('db functions for application', () => {
  test('should add an application to the database', async () => {
    const first = await addApp(4, {
      app_q1: 'test q1',
      app_q2: {
        option_1: true,
        option_2: false,
        option_3: true,
        option_4: true,
        option_5: true,
      },
      app_q3: false,
      app_q4: { option_1: true, option_2: false },
      app_q5: 3,
      app_q6: 'test q6',
      app_q7: 'test q7',
      app_q8: 'test q8',
    })
    expect(first.id).toBe(1)
    const second = await addApp(6, {
      app_q1: 'test q1',
      app_q2: {
        option_1: false,
        option_2: false,
        option_3: true,
        option_4: true,
        option_5: true,
      },
      app_q3: false,
      app_q4: { option_1: true, option_2: false },
      app_q5: 2,
      app_q6: 'test q6',
      app_q7: 'test q7',
      app_q8: 'test q8',
    })
    expect(second.id).toBe(2)
  })
})
