const db = require('../../data/db-config.js')

const findOrAddQ = async (app_q, values) => {
  let app_q_id = await db(app_q)
    .where(values[app_q])
    .first()
  if (!app_q_id) app_q_id = (await db(app_q).insert(values[app_q], ['id']))[0]
  return app_q_id
}

const findQ = async (app_q, values) =>
  await db(app_q)
    .where({ answer: values[app_q] })
    .first()

const addApp = async (member_id, values) => {
  const app_q1_a = await findOrAddQ('app_q1_a', values)
  const app_q2 = await findOrAddQ('app_q2', values)
  const app_q3 = await findQ('app_q3', values)
  const app_q4 = await findQ('app_q4', values)
  const app_q6_a = await findQ('app_q6_a', values)
  const app_q6_b = await findOrAddQ('app_q6_b', values)
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

const findA = async (app_q, a_id) =>
  await db(app_q)
    .where('id', a_id)
    .first()

const findApp = async member_id => {
  const a = await db('application')
    .where(member_id)
    .first()

  if (!a) return false

  return {
    app_q1_a: await findA('app_q1_a', a.app_q1_a_id),
    app_q1_b: a.app_q1_b,
    app_q2: await findA('app_q2', a.app_q2_id),
    app_q3: (await findA('app_q3', a.app_q3_id)).answer,
    app_q4: (await findA('app_q4', a.app_q4_id)).answer,
    app_q5: a.app_q5,
    app_q6_a: (await findA('app_q6_a', a.app_q6_a_id)).answer,
    app_q6_b: await findA('app_q6_b', a.app_q6_b_id),
    app_status: a.app_approved_id,
  }
}

const changeAppStatus = async (member_id, newStatus) => {
  ;(
    await db('application')
      .update({ app_approved_id: newStatus })
      .where(member_id)
  )[0]
  return await findApp(member_id)
}
module.exports = { addApp, findApp, changeAppStatus }
