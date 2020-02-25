const db = require('../../../data/db-config.js')

const Locations = require('../locations/location-helper.js')

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
}

async function add(neighborData) {
  let city = await Locations.findCityByName(neighborData.city)
  let state = await Locations.findStateByName(neighborData.state)
  let zip = await Locations.findByZip(neighborData.zip)

  if (!city) {
    let newCity = await Locations.addCity({ city: neighborData.city })
    city = newCity[0]
  }

  if (!state) {
    let newState = await Locations.addState({ state: neighborData.state })
    state = newState[0]
  }

  if (!zip) {
    let newZip = await Locations.addZip({ zip: neighborData.zip })
    zip = newZip[0]
  }

  let cityStateZip = await Locations.findByLocation(
    city.city_id,
    state.state_id,
    zip.zip_id
  )

  if (!cityStateZip) {
    let newCityStateZip = await Locations.addCityStateZip(
      city.city_id,
      state.state_id,
      zip.zip_id
    )
    cityStateZip = newCityStateZip[0]
  }

  return db('neighbors').insert(
    {
      first_name: neighborData.first_name,
      last_name: neighborData.last_name,
      email: neighborData.email,
      phone: neighborData.phone,
      address: neighborData.address,
      city_state_zip_id: cityStateZip.city_state_zip_id,
    },
    [
      'first_name',
      'last_name',
      'email',
      'phone',
      'address',
      'city_state_zip_id',
    ]
  )
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
