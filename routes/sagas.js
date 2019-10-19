const express = require('express');
const redis = require('redis');
const client = redis.createClient({host: 'redis'});
const router = express.Router();
const mongoose = require('mongoose');
const Sagas = mongoose.model('sagas');

router.get('/', (req, res, next) => {
    client.get('sagas', (err, result) => {
        if(err) throw err;
        if( result ){
            res.status(200).json(JSON.parse(result));
        }else{
            Sagas.find({}, (err, sagas) => {
                if(err) throw err;
                client.setex('sagas', process.env.REDIS_EXP_TIME, JSON.stringify(sagas));
                res.status(200).json(sagas);
            });
        }
    })
});

router.get('/:name', (req, res, next) => {
    const name = req.params.name;
    client.get(name, (err, result) => {
        if(err) throw err;
        if(result){
            res.status(200).json(JSON.parse(result));
        }else{
            Sagas.findOne({'name': { $regex: new RegExp(`^${name}`, "i")}}, (err, saga) => {
                if(err) throw err;
                client.setex(name, process.env.REDIS_EXP_TIME, JSON.stringify(saga));
                res.status(200).json(saga);
            });
        }
    });
});

module.exports = router;