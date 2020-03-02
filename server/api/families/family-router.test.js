const server = require('../../server'),
  request = require('supertest'),
  db = require('../../../data/db-config')

describe('api/families', () => {
  beforeAll(() => db.seed.run())

  describe(`POST '/'`, () => {
    test('should respond with a status 201 and a json message for success', async () => {
      const res = await request(server)
        .post('/api/families')
        .send({
          first_name: 'John',
          last_name: 'Smith',
          email: 'john.smith@email.com',
          phone: '503-555-8654',
          address: '1234 Main Street, APT 5',
          city: 'New Haven',
          state: 'Connecticut',
          zip: '06516',
        })

      expect(res.status).toBe(201)

      expect(JSON.parse(res.text).message).toBe('Family successfully added.')

      expect(JSON.parse(res.text).saved[0]).toMatchObject({
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@email.com',
        phone: '503-555-8654',
        address: '1234 Main Street, APT 5',
        city_state_zip_id: 4,
      })
    })
  })

  describe(`GET '/'`, () => {
    test('should respond with status 200, and an array of families', async () => {
      const res = await request(server).get('/api/families')

      expect(res.status).toBe(200)

      expect(JSON.parse(res.text).length).toBe(4)

      expect(JSON.parse(res.text)[0]).toMatchObject({
        family_id: 1,
        first_name: 'Joseph',
        last_name: 'Rodriguez',
        email: 'Joseph49er@yahoo.com',
        phone: '200-800-7648',
        address: '1245 Wynnstone Dr',
        city: 'Boulder',
        state: 'Colorado',
        zip: '80301',
      })
    })
  })

  describe(`GET '/:id'`, () => {
    test('should respond with status 200, and the requested family', async () => {
      const res = await request(server).get('/api/families/1')

      expect(res.status).toBe(200)

      expect(JSON.parse(res.text)).toMatchObject({
        family_id: 1,
        first_name: 'Joseph',
        last_name: 'Rodriguez',
        email: 'Joseph49er@yahoo.com',
        phone: '200-800-7648',
        address: '1245 Wynnstone Dr',
        city: 'Boulder',
        state: 'Colorado',
        zip: '80301',
      })
    })
  })

  describe(`PUT '/:id'`, () => {
    test('should respond with status 200, and the updated family', async () => {
      const res = await request(server)
        .put('/api/families/1')
        .send({
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@email.com',
          phone: '503-555-8655',
          address: '1234 Main Street, APT 7',
        })

      expect(res.status).toBe(200)

      expect(JSON.parse(res.text)[0]).toMatchObject({
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@email.com',
        phone: '503-555-8655',
        address: '1234 Main Street, APT 7',
      })
    })
  })

  describe(`DELETE '/:id'`, () => {
    test('should respond with status 200, and the requested family', async () => {
      const res = await request(server).delete('/api/families/4')

      expect(res.status).toBe(200)

      expect(JSON.parse(res.text).message).toBe('family successfully deleted.')
    })
  })

  describe(`custom error handling`, () => {
    test('should respond with status 500, a message, and the original thrown error', async () => {
      const res = await request(server).get('/api/families/a')

      expect(res.status).toBe(500)

      expect(JSON.parse(res.text).message).toBe('Uh Oh! 500 Error!')

      expect(JSON.parse(res.text).error).toMatch(/invalid input syntax/)
    })
  })
})
