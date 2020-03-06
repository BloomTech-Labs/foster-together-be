exports.seed = knex =>
  knex('users')
    .del()
    .then(() =>
      knex('users').insert([
        {
          email: 'blob@blob.com',
          username: 'blobblob',
          password:
            '$2a$14$FW.j/dIcqegesehfefcxVOsevIysPkkKi6O27/qpIk64qC8cxF9Ti',
        },
        {
          email: 'blah@blah.com',
          username: 'blahblah',
          password:
            '$2a$14$3zoGnAEVVcVTz20glapt9eI2Y/WNLkbqM4H.F4xL2DI24xdT29Fs2',
        },
      ])
    )
