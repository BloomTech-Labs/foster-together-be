const db = require('../../data/db-config.js')

const q2 = async values => {
  let app_q2 = await db('app_q2')
    .where(values.app_q2)
    .first()
  if (!app_q2) app_q2 = (await db('app_q2').insert(values.app_q2, ['id']))[0]
  return app_q2
}

const q3 = async values =>
  await db('app_q3')
    .where({ answer: values.app_q3 })
    .first()

const q4 = async values =>
  await db('app_q4')
    .where(values.app_q4)
    .first()

const q5 = async values =>
  await db('app_q5')
    .where({ answer: values.app_q5 })
    .first()

const addApp = async (member_id, values) => {
  const app_q2 = await q2(values)

  const app_q3 = await q3(values)

  const app_q4 = await q4(values)

  const app_q5 = await q5(values)

  return (
    await db('application').insert(
      {
        app_q1: values.app_q1,
        app_q2_id: app_q2.id,
        app_q3_id: app_q3.id,
        app_q4_id: app_q4.id,
        app_q5_id: app_q5.id,
        app_q6: values.app_q6,
        app_q7: values.app_q7,
        app_q8: values.app_q8,
        app_approved_id: 1,
        member_id,
      },
      ['id']
    )
  )[0]
}

module.exports = { addApp }
