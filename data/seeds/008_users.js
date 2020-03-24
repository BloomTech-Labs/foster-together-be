exports.seed = knex =>
  knex('users')
    .del()
    .then(() =>
      knex('users').insert([
        {
          email: 'hope@email.com',
          password:
            '$2a$14$/UxZ6f8nT5WNK8Ux3KMIg.BihBm8QpM1B687EQVYigP7MnBHzYbJq',
          admin_id: 1,
        },
        {
          email: 'abbie@email.com',
          password:
            '$2a$14$VN1RLlDooCx4uh1fXoIN8uwQPqL5poFfg8eC8Fc0MYavXkyplCHmK',
          admin_id: 2,
        },
        {
          email: 'grace@email.com',
          password:
            '$2a$14$nAz6IZLjJZJPQKT/onvuk.TDVOvMWMz8KnJKnqBzq3DuTmyGkm.Qe',
          admin_id: 3,
        },
        {
          email: 'Joseph49er@yahoo.com',
          password:
            '$2a$14$DLYeihcr9h7tK3KYjtnpmOvUUlBkjBo/zHMMY31mUDVpvqi2b9HAS',
          member_id: 1,
        },
        {
          email: 'robert@test.com',
          password:
            '$2a$14$8t9ZL.XwEUGInBdd/QNiourwVtEvYA7ZtbhkwRP56zebe4ZkT3WQq',
          member_id: 2,
        },
        {
          email: 'isabela@test.com',
          password:
            '$2a$14$uo4/qFWR4Xub6IPGld8AdO7S079Y80NzegH.yRt9LplH10y4/Y2.6',
          member_id: 3,
        },
        {
          email: 'GreceMana@yahoo.com',
          password:
            '$2a$14$y.GcG.E.mNv5fgJesFuY1.QeX/YU1o1LBlHyrlrjPvJesnlpuuK9S',
          member_id: 4,
        },
        {
          email: 'Richmon@yahoo.com',
          password:
            '$2a$14$m6HxNH2VIjuityVHB68XhOKmnUIG55LJEJcPhjR6H/azCCo3k7m/K',
          member_id: 5,
        },
        {
          email: 'Chuthedewd@yahoo.com',
          password:
            '$2a$14$RJwj3z816eMC5slQEV9Cq.CwQraqp9ImWSMUkfOYdQN.UEfhrcxkG',
          member_id: 6,
        },
      ])
    )
