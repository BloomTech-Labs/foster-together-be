const db = require('../../data/db-config.js'),
  { add, find, findBy, update, remove } = require('./member-helper')

describe('member-helper', () => {
  describe('CREATE', () => {
    beforeEach(async () => await db.seed.run())

    test('add should successfully add a neighbor to database', async () => {
      await add('neighbors', {
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@email.com',
        phone: '503-555-8654',
        address: '1234 Main Street, APT 5',
        city: 'Albuquerque',
        state: 'NM',
        zip: '86555',
      })

      const neighbor = await db('neighbors')

      expect(neighbor[3]).toMatchObject({
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@email.com',
        phone: '503-555-8654',
        address: '1234 Main Street, APT 5',
        city_state_zip_id: 4,
      })

      const city_state_zip = await db('city_state_zip')

      expect(city_state_zip[3].id).toBe(4)
    })
  })

  describe('READ', () => {
    beforeEach(() => db.seed.run())

    describe('find', () => {
      test('returns array of 6 neighbors and families', async () => {
        const neighbors = await find()

        expect(neighbors.length).toBe(6)
      })
    })

    describe('findBy', () => {
      test('should be passed a filter and return results that match', async () => {
        const found = await findBy('neighbors', ['email', 'Richmon@yahoo.com'])

        expect(found[0]).toMatchObject({
          id: 2,
          first_name: 'Tommy',
          last_name: 'Richmon',
          email: 'Richmon@yahoo.com',
          phone: '102-808-3242',
          address: 'Orange County',
          city: 'Colorado Springs',
          state: 'Colorado',
          zip: '80014',
        })
      })
    })
  })

  describe('UPDATE', () => {
    test('update should change an existing record in the neighbors database', async () => {
      await update('neighbors', 2, {
        first_name: 'Johnny',
        last_name: 'Testing',
        email: 'testing@yahoo.com',
        phone: '102-808-3242',
        address: '123 Testing Avenue',
      })
      const updated = (await findBy('neighbors', ['id', 2]))[0]

      expect(updated).toMatchObject({
        first_name: 'Johnny',
        last_name: 'Testing',
        email: 'testing@yahoo.com',
        phone: '102-808-3242',
        address: '123 Testing Avenue',
        city: 'Colorado Springs',
        state: 'Colorado',
        zip: '80014',
      })
    })
  })
  describe('DELETE', () => {
    test('remove should delete a record from the table by id ', async () => {
      const toBeDeleted = (await findBy('neighbors', ['id', 2]))[0]

      expect(toBeDeleted).toMatchObject({
        first_name: 'Johnny',
        last_name: 'Testing',
        email: 'testing@yahoo.com',
        phone: '102-808-3242',
        address: '123 Testing Avenue',
        city: 'Colorado Springs',
        state: 'Colorado',
        zip: '80014',
      })

      await remove('neighbors', 2)

      const deleted = (await findBy('neighbors', ['id', 2]))[0]

      expect(deleted).toBe(undefined)
    })
  })
})
