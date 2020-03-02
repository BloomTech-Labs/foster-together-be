const server = require('../../server'),
  request = require('supertest'),
  db = require('../../../data/db-config')

describe('api/neighbors', () => {
  beforeAll(() => db.seed.run())

  describe(`POST '/'`, () => {
    test('should respond with a status 201 and a json message for success', async () => {
      const res = await request(server)
        .post('/api/neighbors')
        .send({
          first_name: 'John',
          last_name: 'Smith',
          email: 'john.smith@email.com',
          phone: '503-555-8654',
          address: '1234 Main Street, APT 5',
          city: 'New Haven',
          state: 'Connecticut',
          zip: '06512',
        })

      expect(res.status).toBe(201)

      expect(JSON.parse(res.text).message).toBe('Neighbor successfully added.')

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
    test('should respond with status 200, and an array of neighbors', async () => {
      const res = await request(server).get('/api/neighbors')

      expect(res.status).toBe(200)

      expect(JSON.parse(res.text).length).toBe(4)

      expect(JSON.parse(res.text)[0]).toMatchObject({
        neighbor_id: 1,
        first_name: 'Eric',
        last_name: 'Grece',
        email: 'GreceMana@yahoo.com',
        phone: '202-808-6542',
        address: '629 W Cienga Boul',
        city: 'Boulder',
        state: 'Colorado',
        zip: '80301',
      })
    })
  })

  describe(`GET '/:id'`, () => {
    test('should respond with status 200, and the requested neighbor', async () => {
      const res = await request(server).get('/api/neighbors/1')

      expect(res.status).toBe(200)

      expect(JSON.parse(res.text)).toMatchObject({
        neighbor_id: 1,
        first_name: 'Eric',
        last_name: 'Grece',
        email: 'GreceMana@yahoo.com',
        phone: '202-808-6542',
        address: '629 W Cienga Boul',
        city: 'Boulder',
        state: 'Colorado',
        zip: '80301',
      })
    })
  })

  describe(`PUT '/:id'`, () => {
    test('should respond with status 200, and the updated neighbor', async () => {
      const res = await request(server)
        .put('/api/neighbors/1')
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
    test('should respond with status 200, and the requested neighbor', async () => {
      const res = await request(server).delete('/api/neighbors/4')

      expect(res.status).toBe(200)

      expect(JSON.parse(res.text).message).toBe(
        'Neighbor successfully deleted.'
      )
    })
  })

  describe(`custom error handling`, () => {
    test('should respond with status 500, a message, and the original thrown error', async () => {
      const res = await request(server).get('/api/neighbors/a')

      expect(res.status).toBe(500)

      expect(JSON.parse(res.text).message).toBe('Uh Oh! 500 Error!')

      expect(JSON.parse(res.text).error).toMatch(/invalid input syntax/)
    })
  })
})
