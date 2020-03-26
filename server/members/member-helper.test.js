const db = require('../../data/db-config.js'),
  { add, find, update, remove } = require('./member-helper')

describe('member-helper', () => {
  describe('CREATE', () => {
    beforeEach(async () => await db.seed.run())

    test('add should successfully add a neighbor to database', async () => {
      await add('neighbors', {
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@email.com',
        password: 'john',
        phone: '503-555-8654',
        address: '1234 Main Street, APT 5',
        city: 'Albuquerque',
        state: 'NM',
        zip: '86555',
        longitude: -54.5515,
        latitude: 123.8454,
      })

      const neighbors = await db('members AS m')
        .innerJoin('membertypes AS mt', 'm.membertype_id', 'mt.id')
        .where('type', 'neighbors')

      expect(neighbors[3]).toMatchObject({
        first_name: 'John',
        last_name: 'Smith',
        phone: '503-555-8654',
        address: '1234 Main Street, APT 5',
        membertype_id: 2,
        city_state_zip_id: 4,
        longitude: '-54.5515',
        latitude: '123.8454',
      })

      const city_state_zip = await db('city_state_zip')

      expect(city_state_zip[3].id).toBe(4)
    })
  })

  describe('READ', () => {
    beforeEach(() => db.seed.run())

    describe('find', () => {
      test('returns array of 6 neighbors and families', async () => {
        const members = await find()

        expect(members.length).toBe(6)
      })
    })

    describe('find with filter', () => {
      test('should be passed a filter and return results that match', async () => {
        const found = await find({ phone: '102-808-3242' })

        expect(found[0]).toMatchObject({
          id: 5,
          first_name: 'Tommy',
          last_name: 'Richmon',
          phone: '102-808-3242',
          address: 'Orange County',
          city: 'Colorado Springs',
          state: 'Colorado',
          zip: '80014',
          type: 'neighbors',
          longitude: '-104.74184416995553',
          latitude: '39.99855555395869',
        })
      })
    })
  })

  describe('UPDATE', () => {
    test('update should change an existing record in the neighbors database', async () => {
      await update(5, {
        first_name: 'Johnny',
        last_name: 'Testing',
        phone: '102-808-3242',
        address: '123 Testing Avenue',
        city: 'Salt Lake City',
        state: 'Utah',
        zip: '84044',
        longitude: '10.61944',
        latitude: '-91.47337',
      })
      const updated = (await find({ 'm.id': 5 }))[0]

      expect(updated).toMatchObject({
        first_name: 'Johnny',
        last_name: 'Testing',
        phone: '102-808-3242',
        address: '123 Testing Avenue',
        city: 'Salt Lake City',
        state: 'Utah',
        zip: '84044',
        longitude: '10.61944',
        latitude: '-91.47337',
      })
    })
  })
  describe('DELETE', () => {
    test('remove should delete a record from the table by id ', async () => {
      const toBeDeleted = (await find({ 'm.id': 5 }))[0]

      expect(toBeDeleted).toMatchObject({
        first_name: 'Johnny',
        last_name: 'Testing',
        phone: '102-808-3242',
        address: '123 Testing Avenue',
        city: 'Salt Lake City',
        state: 'Utah',
        zip: '84044',
        longitude: '10.61944',
        latitude: '-91.47337',
      })

      await remove(5)

      const deleted = (await find({ 'm.id': 5 }))[0]

      expect(deleted).toBe(undefined)
    })
  })
})
