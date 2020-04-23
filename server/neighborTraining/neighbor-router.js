const express = require('express');

const NeighborTraining = require('./training-helper')

const router = require('express');

router.post('/beginTraining', (req, res) => {
    let member_id = req.body.member_id;
    NeighborTraining.add(member_id)
        .then(member => {
            res.status(201).json(member);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was an error initializing training"
            })
        })
})

router.put('/training', (req, res) => {
    NeighborTraining.update(req.member_id, req.changes)
        .then(neighbor => {
            res.status(200).json(neighbor)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was an error updating the training data"
            })
        })
})

module.exports = router;