function validateSignup(req, res, next) {
  const body = req.body

  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: 'Missing data.' })
  } else if (!body.first_name) {
    res.status(400).json({ message: 'first_name is required.' })
  } else if (!body.last_name) {
    res.status(400).json({ message: 'last_name is required.' })
  } else if (!body.email) {
    res.status(400).json({ message: 'email is required.' })
  } else if (!body.phone) {
    res.status(400).json({ message: 'phone is required.' })
  } else if (!body.address) {
    res.status(400).json({ message: 'address is required.' })
  } else if (!body.city) {
    res.status(400).json({ message: 'city is required.' })
  } else if (!body.state) {
    res.status(400).json({ message: 'address is required.' })
  } else if (!body.zip) {
    res.status(400).json({ message: 'zip is required.' })
  } else if (body.zip.length !== 5) {
    res.status(400).json({ message: 'zip must be 5 characters.' })
  } else {
    next()
  }
}

module.exports = validateSignup
