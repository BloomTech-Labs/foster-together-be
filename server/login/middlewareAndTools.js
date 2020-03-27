const bcrypt = require('bcryptjs'),
  db = require('../../data/db-config'),
  { find } = require('../members/member-helper')

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
  const userData = user.admin_id
    ? await db('admins')
        .where('id', user.admin_id)
        .first()
    : (await find({ 'm.id': user.member_id }))[0]
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return res
      .status(401)
      .json({ message: 'Authorization failed!', token: false })
  req.body.user = {
    subject: user.id,
    type: user.admin_id && 'admins',
    ...userData,
  }
  next()
}

module.exports = { valBody, validatePassword }
