const db = require('../data/db-config')
const { findById } = require('../server/api/families/family-helper')
const validate = require('./validate-id')

describe('family-id', () => {
  beforeEach(() => db.seed.run())
  test('validate Id for family member', async () => {
    const families = await findById(1)

    expect(families).toMatchObject({
      family_id: 1,
      first_name: 'Joseph',
      last_name: 'Rodriguez',
      email: 'Joseph49er@yahoo.com',
      phone: '200-800-7648',
      address: '1245 Wynnstone Dr',
      city_state_zip_id: 1,
    })
  })

  test('if no Id exist throw error', async () => {
    const families = await findById(4)
    expect(families).toBe(undefined)
  })
})
