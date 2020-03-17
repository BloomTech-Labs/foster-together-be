exports.up = function(knex) {
  return knex.schema
    .alterTable('cities', tbl => {
      tbl.renameColumn('city_id', 'id')
    })
    .alterTable('states', tbl => {
      tbl.renameColumn('state_id', 'id')
    })
    .alterTable('zips', tbl => {
      tbl.renameColumn('zip_id', 'id')
    })
    .alterTable('city_state_zip', tbl => {
      tbl.renameColumn('city_state_zip_id', 'id')
    })
    .alterTable('families', tbl => {
      tbl.renameColumn('family_id', 'id')
    })
    .alterTable('neighbors', tbl => {
      tbl.renameColumn('neighbor_id', 'id')
    })
    .alterTable('admins', tbl => {
      tbl.renameColumn('admin_id', 'id')
    })
    .alterTable('users', tbl => {
      tbl.renameColumn('user_id', 'id')
    })
}

exports.down = function(knex) {}
