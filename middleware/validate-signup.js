function validateSignup(req, res, next) {
  const body = req.body

  if (Object.keys(body).length === 0)
    return res.status(400).json({ message: 'Missing data.' })
  if (!body.first_name)
    return res.status(400).json({ message: 'first_name is required.' })
  if (!body.last_name)
    return res.status(400).json({ message: 'last_name is required.' })
  if (!body.email)
    return res.status(400).json({ message: 'email is required.' })
  if (!body.phone)
    return res.status(400).json({ message: 'phone is required.' })
  if (!body.address)
    return res.status(400).json({ message: 'addreturn ress is required.' })
  if (!body.city) return res.status(400).json({ message: 'city is required.' })
  if (!body.state)
    return res.status(400).json({ message: 'state is required.' })
  if (!body.zip) return res.status(400).json({ message: 'zip is required.' })
  if (body.zip.length !== 5)
    return res.status(400).json({ message: 'zip must be 5 characters.' })

  next()
}

module.exports = validateSignup
