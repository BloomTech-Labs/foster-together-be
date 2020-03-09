const db = require('../../../../data/db-config')

addAdmin = async newUser => {
  await db('admins').insert({
    email: newUser.email,
    first_name: newUser.first_name,
  })
  const admin_id = await db('admins')
    .where('email', newUser.email)
    .select('admin_id')
    .first()
  await db('users').insert({
    password: newUser.password,
    admin_id: admin_id.admin_id,
  })
  return await db('admins')
    .where('email', newUser.email)
    .first()
}

module.exports = { addAdmin }
