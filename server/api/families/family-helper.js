const db = require('../../../data/db-config.js')

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
}

function add(familyData) {
  return db('families').insert(familyData)
}

function find() {
  return db('families')
}

function findBy(filter) {
  return db('families').where(filter)
}

function findById(id) {
  return db('families')
    .where('family_id', id)
    .first()
}

function update(id, data) {
  return db('families')
    .where('family_id', id)
    .update({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    })
}

function remove(id) {
  return db('families')
    .where('family_id', id)
    .del()
}
