const db = require('../data/db-config.js')

function validateId(table, tableId) {
  // example parameters: (Neighbors, 'neighbor_id')
  return function(req, res, next) {
    const { id } = req.params

    db(table)
      .first()
      .where(tableId, id)
      .then(resource => {
        if (!resource) {
          res.status(400).json({ message: 'Invalid ID.' })
        } else {
          req.resource = resource
          next()
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Error validating ID.' })
      })
  }
}

module.exports = validateId
