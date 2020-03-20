const db = require('../../data/db-config.js')

const Locations = require('./location-helper.js')

module.exports = {
  add,
  find,
  findMembertype,
  findBy,
  update,
  remove,
  addUser,
}

async function add(membertype, data) {
  let city = await Locations.findCityByName(data.city)
  let state = await Locations.findStateByName(data.state)
  let zip = await Locations.findByZip(Number(data.zip))

  if (!city) city = (await Locations.addCity({ city: data.city }))[0]

  if (!state) state = (await Locations.addState({ state: data.state }))[0]

  if (!zip) zip = (await Locations.addZip({ zip: data.zip }))[0]

  let cityStateZip = await Locations.findByLocation(city.id, state.id, zip.id)

  if (!cityStateZip)
    cityStateZip = (
      await Locations.addCityStateZip(city.id, state.id, zip.id)
    )[0]

  return (
    await db(membertype).insert(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city_state_zip_id: cityStateZip.id,
      },
      ['id']
    )
  )[0]
}

async function addUser(membertype, id, data) {
  membertype === 'families'
    ? await db('users').insert({ password: data.password, family_id: id })
    : await db('users').insert({ password: data.password, neighbor_id: id })
}

async function find() {
  const allMembers = [
    ...(await findMembertype('families')),
    ...(await findMembertype('neighbors')),
  ]
  return allMembers
}

async function findMembertype(membertype) {
  const memberArray = (await findBy(membertype)).map(member => ({
    ...member,
    type: membertype,
  }))
  return memberArray
}

function findBy(membertype, filter) {
  return db(membertype)
    .join('city_state_zip as csz', 'csz.id', `${membertype}.city_state_zip_id`)
    .join('cities as c', 'c.id', 'csz.city_id')
    .join('states as s', 's.id', 'csz.state_id')
    .join('zips as z', 'z.id', 'csz.zip_id')
    .select(
      `${membertype}.id`,
      `${membertype}.first_name`,
      `${membertype}.last_name`,
      `${membertype}.email`,
      `${membertype}.phone`,
      `${membertype}.address`,
      'c.city',
      's.state',
      'z.zip'
    )
    .modify(function(queryBuilder) {
      if (filter) {
        queryBuilder.where(`${membertype}.${filter[0]}`, filter[1])
      }
    })
}

function update(membertype, id, data) {
  return db(membertype)
    .where('id', id)
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

function remove(membertype, id) {
  return db(membertype)
    .where('id', id)
    .del()
}
