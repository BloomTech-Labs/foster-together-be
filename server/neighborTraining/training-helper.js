const db = require('../../data/db-config.js')

module.exports = {
    add,
    findTrainingByUserId,
    update,
    remove
}

function add(member_id) {
    return db('neighbor_training')
        .insert(member_id)
        .then(ids => {
            return findTrainingByUserId(ids[0])
        })
}

function findTrainingByUserId(member_id) {
    return db('neighbor_training')
        .where('member_id', member_id)
        .first()
}

function update(member_id, changes) {
    return db('neighbor_training')
        .where('member_id', member_id)
        .update(changes)
        .then(() => {
            return findTrainingByUserId(member_id);
        })
}

function remove(member_id) {
    return db('neighbor_training')
        .where('member_id', member_id)
        .del();
}