exports.seed = knex =>
  knex('users')
    .del()
    .then(() =>
      knex('users').insert([
        {
          password:
            '$2a$14$FW.j/dIcqegesehfefcxVOsevIysPkkKi6O27/qpIk64qC8cxF9Ti',
          admin_id: 1,
        },
        {
          password:
            '$2a$14$3zoGnAEVVcVTz20glapt9eI2Y/WNLkbqM4H.F4xL2DI24xdT29Fs2',
          admin_id: 2,
        },
      ])
    )
