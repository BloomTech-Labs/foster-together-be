const db = require('../../data/db-config.js')

const findOrAdd = async (app_q, values) => {
  let app_q_id = await db(app_q)
    .where(values[app_q])
    .first()
  if (!app_q_id) app_q_id = (await db(app_q).insert(values[app_q], ['id']))[0]
  return app_q_id
}

const q3 = async values =>
  await db('app_q3')
    .where({ answer: values.app_q3 })
    .first()

const q4 = async values =>
  await db('app_q4')
    .where({ answer: values.app_q4 })
    .first()

const q6_a = async values =>
  await db('app_q6_a')
    .where({ answer: values.app_q6_a })
    .first()

const addApp = async (member_id, values) => {
  const app_q1_a = await findOrAdd('app_q1_a', values)
  const app_q2 = await findOrAdd('app_q2', values)
  const app_q3 = await q3(values)
  const app_q4 = await q4(values)
  const app_q6_a = await q6_a(values)
  const app_q6_b = await findOrAdd('app_q6_b', values)
  return (
    await db('application').insert(
      {
        app_q1_a_id: app_q1_a.id,
        app_q1_b: values.app_q1_b,
        app_q2_id: app_q2.id,
        app_q3_id: app_q3.id,
        app_q4_id: app_q4.id,
        app_q5: values.app_q5,
        app_q6_a_id: app_q6_a.id,
        app_q6_b_id: app_q6_b.id,
        app_approved_id: 1,
        member_id,
      },
      ['id']
    )
  )[0]
}

module.exports = { addApp }
