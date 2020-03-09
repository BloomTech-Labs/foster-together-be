exports.up = function(knex) {
  return knex.schema.alterTable('admins', tbl => {
    tbl.renameColumn('display_name', 'first_name')
  })
}

exports.down = function(knex) {}
