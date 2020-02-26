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

  describe('Post', () => {
    test('should recieve 201', async () => {
      const res = await testing(server)
        .post('/api/admins')
        .send({
          email: 'jay@email.com',
          display_name: 'Jay',
        })
      expect(res.status).toBe(201)
      expect(res.text).toBe(
        '{"admin":{"email":"jay@email.com","display_name":"Jay"}}'
      )
    })
  })

  describe('Get', () => {
    test('should recieve all users and 200 status', async () => {
      const res = await testing(server).get('/api/admins')
      expect(res.status).toBe(200)
      expect(res.text).toBe(
        '[{"admin_id":1,"email":"hope@email.com","display_name":"Hope"},{"admin_id":2,"email":"abbie@email.com","display_name":"Abbie"},{"admin_id":3,"email":"grace@email.com","display_name":"Grace"},{"admin_id":4,"email":"jay@email.com","display_name":"Jay"}]'
      )
    })
  })

  describe('Get', () => {
    test('should recieve 200 get user by id', async () => {
      const res = await testing(server).get('/api/admins/1')
      expect(res.status).toBe(200)
      expect(res.text).toBe(
        '{"admin_id":1,"email":"hope@email.com","display_name":"Hope"}'
      )
    })

    describe('Delete', () => {
      test('should recieve 200 for deleting user', async () => {
        const res = await testing(server).delete('/api/admins/1')
        expect(res.status).toBe(200)
        expect(res.text).toBe('{"id":"1"}')
      })
    })

    describe('Update', () => {
      test('should update information', async () => {
        const res = await testing(server)
          .post('/api/admins/4')
          .send({
            email: 'longday@email.com',
          })
        expect(res.status).toBe(200)
      })
    })
  })
})
