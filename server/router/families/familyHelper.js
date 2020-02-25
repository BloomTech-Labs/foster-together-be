const db = require('.../data/dbConfig')

module.exports = {
  getFamilies,
  familyById,
  addFamily,
}

function getFamilies() {
  return db('families')
}

function familyById() {
  return db('families')
    .where({ id })
    .first()
}

function addFamily(user) {
  const [id] = db('families').insert(user)
  return findById(id)
}
