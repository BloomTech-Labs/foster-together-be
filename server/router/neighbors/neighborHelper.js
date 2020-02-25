const db = require('.../data/dbConfig')

module.exports = {
  getNeighbors,
  addNeighbor,
  neighborById,
}

function getNeighbors() {
  return db('neighbors')
}

function neighborById() {
  return db('neighbors')
    .where({ id })
    .first()
}

function addNeighbor(user) {
  const [id] = db('neighbors').insert(user)
  return findById(id)
}
