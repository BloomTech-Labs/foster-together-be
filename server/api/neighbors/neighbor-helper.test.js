const db = require('../../../data/db-config.js'),
  { add, find, findBy, findById, update, remove } = require('./neighbor-helper')

describe('neighbor-helper', () => {
  describe('CREATE', () => {
    beforeEach(async () => await db('neighbors').truncate())

    test('add should successfully add a neighbor to database', async () => {
      await add({
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@email.com',
        phone: '503-555-8654',
        address: '1234 Main Street, APT 5',
      })

      const neighbor = await db('neighbors').first()

      expect(neighbor).toMatchObject({
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@email.com',
        phone: '503-555-8654',
        address: '1234 Main Street, APT 5',
        city_state_zip_id: 1,
      })
    })
  })

  describe('READ', () => {
    beforeEach(() => db.seed.run())

    describe('find', () => {
      test('returns array of 3 neighbors', async () => {
        const neighbors = await find()

        expect(neighbors.length).toBe(3)
      })
    })

    describe('findBy', () => {
      test('should be passed a filter and return results that match', async () => {
        const found = await findBy({ email: 'Richmon@yahoo.com' })

        expect(found[0]).toMatchObject({
          first_name: 'Tommy',
          last_name: 'Richmon',
          email: 'Richmon@yahoo.com',
          phone: '102-808-3242',
          address: 'Orange County',
          city_state_zip_id: 2,
        })
      })
    })

    describe('findById', () => {
      test('should find a neighbor by id', async () => {
        const found = await findById(2)

        expect(found).toMatchObject({
          first_name: 'Tommy',
          last_name: 'Richmon',
          email: 'Richmon@yahoo.com',
          phone: '102-808-3242',
          address: 'Orange County',
          city_state_zip_id: 2,
        })
      })
    })
  })

  describe('UPDATE', () => {
    test('update should change an existing record in the neighbors database', async () => {
      await update(2, {
        first_name: 'Johnny',
        last_name: 'Testing',
        email: 'testing@yahoo.com',
        phone: '102-808-3242',
        address: '123 Testing Avenue',
        city_state_zip_id: 2,
      })
      const updated = await findById(2)

      expect(updated).toMatchObject({
        first_name: 'Johnny',
        last_name: 'Testing',
        email: 'testing@yahoo.com',
        phone: '102-808-3242',
        address: '123 Testing Avenue',
        city_state_zip_id: 2,
      })
    })
  })
  describe('DELETE', () => {
    test('remove should delete a record from the table by id ', async () => {
      const toBeDeleted = await findById(2)

      expect(toBeDeleted).toMatchObject({
        first_name: 'Johnny',
        last_name: 'Testing',
        email: 'testing@yahoo.com',
        phone: '102-808-3242',
        address: '123 Testing Avenue',
        city_state_zip_id: 2,
      })

      await remove(2)

      const deleted = await findById(2)

      expect(deleted).toBe(undefined)
    })
  })
})
