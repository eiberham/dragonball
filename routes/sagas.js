const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Sagas = mongoose.model('sagas');

router.get('/', (req, res, next) => {
    Sagas.find({}, (err, sagas) => {
        if(err) throw err;
        res.json(sagas);
    });
});

router.get('/:name', (req, res, next) => {
    const name = req.params.name;
    Sagas.find({name}, (err, saga) => {
        if(err) throw err;
        res.json(saga);
    });
});

module.exports = router;