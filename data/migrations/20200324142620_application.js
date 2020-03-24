exports.up = function(knex) {
  return knex.schema.createTable('application', tbl => {
    tbl.increments('id')
    tbl.text('app_q1')
    tbl
      .integer('app_q2_id')
      .unsigned()
      .references('app_q2.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl
      .integer('app_q3_id')
      .unsigned()
      .references('app_q3.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl
      .integer('app_q4_id')
      .unsigned()
      .references('app_q4.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl
      .integer('app_q5_id')
      .unsigned()
      .references('app_q5.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl.text('app_q6')
    tbl.text('app_q7')
    tbl.text('app_q8')
    tbl
      .integer('app_approved_id')
      .unsigned()
      .references('app_approved.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl
      .integer('member_id')
      .unsigned()
      .references('members.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('application')
}
