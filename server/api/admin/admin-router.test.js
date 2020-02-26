const server = require('../../server')
const testing = require('supertest')
db = require('../../../data/db-config')

describe('api/admins', () => {
  beforeAll(() => db.seed.run())

  describe('Post', () => {
    test('should get status 200', async () => {
      const res = await testing(server)
        .post('/api/admins/login')
        .send({
          email: 'hope@email.com',
          display_name: 'Hope',
        })
      expect(res.status).toBe(200)
    })
    test('should recieve status of 500', async () => {
      const res = await testing(server)
        .post('/api/admins/login')
        .send({})
      expect(res.status).toBe(500)
    })
  })
})
