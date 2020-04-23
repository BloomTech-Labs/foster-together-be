const express = require('express');

const NeighborTraining = require('./training-helper')

const router = express.Router();

router.post('/start', (req, res) => {
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

router.put('/update', (req, res) => {
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

router.get('/:id', (req, res) => {
    NeighborTraining.findTrainingByUserId(req.params.id)
        .then(neighbor => {
            res.status(200).json(neighbor)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                message: "No training for that member exists"
            })
        })
})

module.exports = router;