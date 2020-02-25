const db = require('../../../data/db-config.js')

module.exports = {
  addCity,
  findCities,
  findCityById,
  findCityByName,
  addState,
  findStates,
  findStateById,
  findStateByName,
  addZip,
  findZips,
  findZipById,
  findByZip,
}

// CITIES

function addCity(cityData) {
  return db('cities').insert(cityData)
}

// return array of all cities
function findCities() {
  return db('cities')
}

function findCityById(id) {
  return db('cities')
    .where('city_id', id)
    .first()
}

function findCityByName(name) {
  return db('cities')
    .where('city', name)
    .first()
}

// STATES

function addState(stateData) {
  return db('states').insert(stateData)
}

// return array of all states
function findStates() {
  return db('states')
}

function findStateById(id) {
  return db('states')
    .where('state_id', id)
    .first()
}

function findStateByName(name) {
  return db('states')
    .where('state', name)
    .first()
}

// ZIPS

function addZip(zipData) {
  return db('zips').insert(zipData)
}

// return array of all cities
function findZips() {
  return db('zips')
}

function findZipById(id) {
  return db('zips')
    .where('zip_id', id)
    .first()
}

function findByZip(zip) {
  return db('zips')
    .where('zip', zip)
    .first()
}
