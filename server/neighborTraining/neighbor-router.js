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
            res.status(500).json({
                error: "There was an error initializing training"
            })
        })
})

router.put('/update', (req, res) => {
    NeighborTraining.update(req.body.member_id, req.body.changes)
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

router.get('/', (req, res) => {
    NeighborTraining.find()
        .then(neighbors => {
            res.status(200).json(neighbors);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                message: "Could not retrieve training"
            })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    NeighborTraining.remove(id)
        .where('member_id', id)
        .then(count => {
            res.status(200).json({
                message: `${count} record deleted`
            })
        })
        .catch(err => {
            res.status(500).json({
                error: "There was an error deleting training"
            })
        })
})

module.exports = router;