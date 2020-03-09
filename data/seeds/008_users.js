exports.seed = knex =>
  knex('users')
    .del()
    .then(() =>
      knex('users').insert([
        {
          password:
            '$2a$14$sCVMd5B5ITznEB2lkPUTI.HxQQZYsjjWEDOhGDx2duqjeghH60ida',
          admin_id: 1,
        },
        {
          password:
            '$2a$14$LlVu4ZBae1MBn6brOODI4OdM76s7hBOJUaLWx7qXbuuUmy6T.btF2',
          admin_id: 2,
        },
        {
          password:
            '$2a$14$Y8IbSs3SmKR2Y9nNx6dwL.AhbTbyg5r0U4fV51D6DoRiyII9GMPOe',
          admin_id: 3,
        },
      ])
    )
