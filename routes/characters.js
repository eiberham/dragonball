const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Characters = mongoose.model('characters');

router.get('/', (req, res, next) => {
    Characters.find({}, (err, characters) => {
        if(err) throw err;
        res.json(characters);
    })
});

module.exports = router;