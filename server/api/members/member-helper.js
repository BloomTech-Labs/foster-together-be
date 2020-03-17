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
  let zip = await Locations.findByZip(Number(neighborData.zip))

  if (!city) {
    let newCity = await Locations.addCity({ city: neighborData.city })
    city = newCity[0]
  }

  if (!state) {
    let newState = await Locations.addState({ state: neighborData.state })
    state = newState[0]
  }

  if (!zip) {
    let newZip = await Locations.addZip({ zip: Number(neighborData.zip) })
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
  return db('neighbors as n')
    .join(
      'city_state_zip as csz',
      'csz.city_state_zip_id',
      'n.city_state_zip_id'
    )
    .join('cities as c', 'c.city_id', 'csz.city_id')
    .join('states as s', 's.state_id', 'csz.state_id')
    .join('zips as z', 'z.zip_id', 'csz.zip_id')
    .select(
      'n.neighbor_id',
      'n.first_name',
      'n.last_name',
      'n.email',
      'n.phone',
      'n.address',
      'c.city',
      's.state',
      'z.zip'
    )
}

function findBy(filter) {
  return db('neighbors as n')
    .join(
      'city_state_zip as csz',
      'csz.city_state_zip_id',
      'n.city_state_zip_id'
    )
    .join('cities as c', 'c.city_id', 'csz.city_id')
    .join('states as s', 's.state_id', 'csz.state_id')
    .join('zips as z', 'z.zip_id', 'csz.zip_id')
    .select(
      'n.neighbor_id',
      'n.first_name',
      'n.last_name',
      'n.email',
      'n.phone',
      'n.address',
      'c.city',
      's.state',
      'z.zip'
    )
    .where(filter)
}

function findById(id) {
  return db('neighbors as n')
    .join(
      'city_state_zip as csz',
      'csz.city_state_zip_id',
      'n.city_state_zip_id'
    )
    .join('cities as c', 'c.city_id', 'csz.city_id')
    .join('states as s', 's.state_id', 'csz.state_id')
    .join('zips as z', 'z.zip_id', 'csz.zip_id')
    .select(
      'n.neighbor_id',
      'n.first_name',
      'n.last_name',
      'n.email',
      'n.phone',
      'n.address',
      'c.city',
      's.state',
      'z.zip'
    )
    .where('n.neighbor_id', id)
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
