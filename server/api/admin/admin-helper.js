const db = require('../../../data/db-config.js')

module.exports = {
  add,
  update,
  adminDelete,
}

function add(adminData) {
  return db('admins').insert(adminData)
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
