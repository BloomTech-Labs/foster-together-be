const db = require('../../../data/db-config')
const {
  add,
  findBy,
  findById,
  update,
  adminDelete,
  find,
} = require('./admin-helper')

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
  describe('find', () => {
    beforeEach(() => db.seed.run())
    test('3 admins returnedd', async () => {
      const admins = await find()
      expect(admins.length).toBe(3)
    })
  })

  describe('findById', () => {
    test('find admin by id', async () => {
      const find = await findById(1)
      expect(find).toMatchObject({
        admin_id: 1,
        email: 'hope@email.com',
        display_name: 'Hope',
      })
    })
  })
  describe('update', () => {
    beforeEach(() => db.seed.run())
    test('update admin', async () => {
      await update(1, {
        email: 'hope@email.com',
        display_name: 'HopeTest',
      })

      const updateAdmin = await findById(1)

      expect(updateAdmin).toMatchObject({
        admin_id: 1,
        email: 'hope@email.com',
        display_name: 'HopeTest',
      })
    })
  })
  describe('delete', () => {
    beforeEach(() => db.seed.run())
    test('delete admin', async () => {
      const userDelete = await findById(1)
      expect(userDelete).toMatchObject({
        admin_id: 1,
        email: 'hope@email.com',
        display_name: 'Hope',
      })

      await adminDelete(1)
      const deleted = await findById(1)
      expect(deleted).toBe(undefined)
    })
  })

  describe('findBy', () => {
    beforeEach(() => db.seed.run())
    test('find user by', async () => {
      const findUser = await findBy({ email: 'hope@email.com' })
      expect(findUser).toMatchObject([
        {
          admin_id: 1,
          email: 'hope@email.com',
          display_name: 'Hope',
        },
      ])
    })
  })
})
