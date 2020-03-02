const db = require('../../../data/db-config.js'),
  { add, find, findBy, findById, update, remove } = require('./family-helper')

describe('family-helper', () => {
  describe('CREATE', () => {
    beforeEach(async () => await db.seed.run())

    test('add should successfully add a family to database', async () => {
      await add({
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@email.com',
        phone: '503-555-8654',
        address: '1234 Main Street, APT 5',
        city: 'Denver',
        state: 'Colorado',
        zip: '80301',
      })

      const family = await db('families')

      expect(family[3]).toMatchObject({
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@email.com',
        phone: '503-555-8654',
        address: '1234 Main Street, APT 5',
        city_state_zip_id: 4,
      })
    })
  })

  describe('READ', () => {
    beforeEach(() => db.seed.run())

    describe('find', () => {
      test('returns array of 3 families', async () => {
        const families = await find()

        expect(families.length).toBe(3)
      })
    })

    describe('findBy', () => {
      test('should be passed a filter and return results that match', async () => {
        const found = await findBy({ email: 'bsev@test.com' })

        expect(found[0]).toMatchObject({
          first_name: 'Bianca',
          last_name: 'Severino',
          email: 'bsev@test.com',
          phone: '200-555-7648',
          address: '32 Cherry Ave',
          city: 'Colorado Springs',
          state: 'Colorado',
          zip: '80014',
        })
      })
    })

    describe('findById', () => {
      test('should find a family by id', async () => {
        const found = await findById(2)

        expect(found).toMatchObject({
          first_name: 'Bianca',
          last_name: 'Severino',
          email: 'bsev@test.com',
          phone: '200-555-7648',
          address: '32 Cherry Ave',
          city: 'Colorado Springs',
          state: 'Colorado',
          zip: '80014',
        })
      })
    })
  })

  describe('UPDATE', () => {
    test('update should change an existing record in the families database', async () => {
      await update(2, {
        first_name: 'Johnny',
        last_name: 'Testing',
        email: 'testing@yahoo.com',
        phone: '102-808-3242',
        address: '123 Testing Avenue',
      })
      const updated = await findById(2)

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
      const toBeDeleted = await findById(2)

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

      await remove(2)

      const deleted = await findById(2)

      expect(deleted).toBe(undefined)
    })
  })
})
