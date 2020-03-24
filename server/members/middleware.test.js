const { validateMemberBody } = require('./middleware.js')

describe('validate memberbody', () => {
  let req = {}
  let res = {}

  let next = jest.fn()

  test('expect next() to be called when all data is given', () => {
    req = {
      body: {
        first_name: 'Test',
        last_name: 'Test',
        email: 'test@yahoo.com',
        phone: '555-623-6542',
        address: '333 Briarwood Ln',
        city: 'New Haven',
        state: 'Connecticut',
        zip: '06513',
        password: '',
        confirmPassword: '',
        longitude: -54.5515,
        latitude: 123.8454,
      },
      method: 'POST',
    }
    validateMemberBody(req, res, next)
    expect(next).toBeCalled()
  })
})
