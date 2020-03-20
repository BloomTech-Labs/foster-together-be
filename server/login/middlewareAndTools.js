const bcrypt = require('bcryptjs'),
  db = require('../../data/db-config')

const valBody = (req, res, next) => {
  if (!req.body.email && !req.body.password)
    throw new Error('Must send both an email and a password')
  if (!req.body.email) throw new Error('Must send an email')
  if (!req.body.password) throw new Error('Must send a password')
  next()
}

const validatePassword = async (req, res, next) => {
  const user = await db('users')
    .where('email', req.body.email)
    .first()
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return res
      .status(401)
      .json({ message: 'Authorization failed!', token: false })
  req.body.user = {
    subject: user.id,
    id: user.admin_id || user.family_id || user.neighbor_id,
    membertype: user.admin_id
      ? 'admins'
      : user.family_id
      ? 'families'
      : 'neighbors',
  }
  next()
}

const getUserDetails = async (id, membertype) =>
  await db(membertype)
    .where('id', id)
    .first()

module.exports = { valBody, validatePassword, getUserDetails }
