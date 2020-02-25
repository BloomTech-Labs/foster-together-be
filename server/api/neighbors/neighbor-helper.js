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
  return db('neighbors').insert(neighborData)
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
    .update({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    })
}

function remove(id) {
  return db('neighbors')
    .where('neighbor_id', id)
    .del()
}
