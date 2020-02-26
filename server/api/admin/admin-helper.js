const db = require('../../../data/db-config.js')

module.exports = {
  add,
  update,
  adminDelete,
  findBy,
  findById,
  find,
}

function add(adminData) {
  return db('admins').insert(adminData)
}

function findBy(filter) {
  return db('admins').where(filter)
}

function findById(id) {
  return db('admins')
    .where('admin_id', id)
    .first()
}

function find() {
  return db('admins')
}

function update(id, changes) {
  return findById(id).update(changes)
}

function adminDelete(id) {
  return findById(id).del()
}
