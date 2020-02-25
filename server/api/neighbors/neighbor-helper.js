const db = require('../../../data/db-config.js')

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
}

function add(neighborData) {
  return db('neighbors').insert({ ...neighborData, city_state_zip_id: 1 }, [
    'first_name',
    'last_name',
    'email',
    'phone',
    'address',
  ])
}

function find() {
  return db('neighbors')
}

function findBy(filter) {
  return db('neighbors').where(filter)
}

function findById(id) {
  return db('neighbors')
    .where('neighbor_id', id)
    .first()
}

function update(id, data) {
  return db('neighbors')
    .where('neighbor_id', id)
    .update(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
      ['first_name', 'last_name', 'email', 'phone', 'address']
    )
}

function remove(id) {
  return db('neighbors')
    .where('neighbor_id', id)
    .del()
}
