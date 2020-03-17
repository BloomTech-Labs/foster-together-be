const db = require('../../data/db-config.js')

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
  findByLocation,
  addCityStateZip,
}

// CITIES

function addCity(cityData) {
  return db('cities').insert(cityData, ['id', 'city'])
}

// return array of all cities
function findCities() {
  return db('cities')
}

function findCityById(id) {
  return db('cities')
    .where('id', id)
    .first()
}

function findCityByName(name) {
  return db('cities')
    .where('city', name)
    .first()
}

// STATES

function addState(stateData) {
  return db('states').insert(stateData, ['id', 'state'])
}

// return array of all states
function findStates() {
  return db('states')
}

function findStateById(id) {
  return db('states')
    .where('id', id)
    .first()
}

function findStateByName(name) {
  return db('states')
    .where('state', name)
    .first()
}

// ZIPS

function addZip(zipData) {
  return db('zips').insert(zipData, ['id', 'zip'])
}

// return array of all cities
function findZips() {
  return db('zips')
}

function findZipById(id) {
  return db('zips')
    .where('id', id)
    .first()
}

function findByZip(zip) {
  return db('zips')
    .where('zip', zip)
    .first()
}

// CITY_STATE_ZIP

function findByLocation(cityId, stateId, zipId) {
  return db('city_state_zip')
    .where({ city_id: cityId, state_id: stateId, zip_id: zipId })
    .first()
}

function addCityStateZip(cityId, stateId, zipId) {
  return db('city_state_zip').insert(
    {
      city_id: cityId,
      state_id: stateId,
      zip_id: zipId,
    },
    ['id', 'city_id', 'state_id', 'zip_id']
  )
}
