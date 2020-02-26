const db = require('../../../data/db-config')
const { add, findBy, findById, update, adminDelete } = require('./admin-helper')

describe('admin-helper', () => {
  describe('create', () => {
    beforeEach(async () => await db('admins').truncate())
    test('admin is able to add more users', async () => {
      await add({
        email: 'jarrodskahill@gmail.com',
        display_name: 'JayRock',
      })

      const admin = await db('admins').first()

      expect(admin).toMatchObject({
        email: 'jarrodskahill@gmail.com',
        display_name: 'JayRock',
      })
    })
  })
})
