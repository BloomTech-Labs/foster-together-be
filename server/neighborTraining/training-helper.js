const db = require('../../data/db-config.js')

module.exports = {
    add,
    find,
    findTrainingByUserId,
    update,
    remove
}

function add(member_id) {
    let newTraining = {
        member_id: member_id,
        m1_q1: "",
        m2_q4: false,
        m2_q7: false,
        m2_q8: false,
        training_completed: false,
        training_approved: false
    }
    return db('neighbor_training')
        .insert(newTraining)
        .then(ids => {
            return db('neighbor_training')
        })
}

function find(){
    return db('neighbor_training')
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