const express = require('express');
const redis = require('redis');
const client = redis.createClient({host: 'redis'});
const router = express.Router();
const mongoose = require('mongoose');
const Films = mongoose.model('films');

router.get('/', (req, res, next) => {
    client.get('films', (err, result) => {
        if(err) throw err;
        if( result ){
            res.status(200).send(JSON.parse(result));
        }else{
            Films.find({}, (err, films) => {
                if(err) throw err;
                client.setex('films', process.env.REDIS_EXP_TIME, JSON.stringify(films));
                res.status(200).json(films);
            })
        }
    })
});

router.get('/:name', (req, res, next) => {
    const name = req.params.name;
    client.get(name, (err, result) => {
        if(err) throw err;
        if (result) {
            res.status(200).send(JSON.parse(result));
        } else {
            Films.findOne({'title': { $regex: new RegExp(`^${name}`, "i")}}, (err, film) => {
                if(err) throw err;
                client.setex(name, process.env.REDIS_EXP_TIME, JSON.stringify(film));
                res.status(200).json(film);
            });
        }
    });
});

module.exports = router;