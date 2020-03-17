const db = require('../data/db-config.js')

function validateId() {
  return async function(req, res, next) {
    const { membertype, id } = req.params
    let resource
    if (membertype === 'neighbor') {
      resource = await db('neighbors')
        .first()
        .where('neighbor_id', id)
    } else {
      resource = await db('families')
        .first()
        .where('family_id', id)
    }
    if (!resource) {
      res.status(400).json({ message: 'Invalid ID.' })
    } else {
      req.resource = resource
      next()
    }
  }
}

module.exports = validateId
