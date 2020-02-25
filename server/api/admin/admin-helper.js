const db = require('../../../data/db-config.js')

module.exports = {
  add,
  update,
  adminDelete,
  findBy,
  findById,
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

function update(id, changes) {
  return db('admins')
    .where({ id })
    .update(changes)
}

function adminDelete(id) {
  return db('admins')
    .where({ id })
    .del(id)
}
