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

const status = aa_id => {
  if (aa_id === 1) return 'Not yet reviewed'
  if (aa_id === 2) return 'Approved'
  if (aa_id === 3) return 'Denied'
  if (aa_id === 4) return 'Out of Area'
}
const findApp = async member_id => {
  const app = await db('application')
    .where(member_id)
    .first()

  const approval = status(app.app_approved_id)

  return {
    app_q1_a: await findA('app_q1_a', app.app_q1_a_id),
    app_q1_b: app.app_q1_b,
    app_q2: await findA('app_q2', app.app_q2_id),
    app_q3: await findA('app_q3', app.app_q3_id),
    app_q4: await findA('app_q4', app.app_q4_id),
    app_q5: app.app_q5,
    app_q6_a: await findA('app_q6_a', app.app_q6_a_id),
    app_q6_b: await findA('app_q6_b', app.app_q6_b_id),
    app_status: approval,
  }
}
module.exports = { addApp, findApp }
