const express = require('express');
const chalk = require('chalk');
const redis = require('redis');
const client = redis.createClient();
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
    client.get(name, (err, result) => {
        if(err) throw err;
        if(result){
            res.send(result);
        }else{
            Sagas.find({'name': { $regex: new RegExp(`^${name}`, "i")}}, (err, saga) => {
                if(err) throw err;
                client.setex(saga, process.env.REDIS_EXP_TIME, JSON.stringify(character));
                res.json(saga);
            });
        }
    });
});

module.exports = router;