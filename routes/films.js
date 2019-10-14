const express = require('express');
const redis = require('redis');
const client = redis.createClient();
const router = express.Router();
const mongoose = require('mongoose');
const Films = mongoose.model('films');

router.get('/', (req, res, next) => {
    client.get('films', (err, result) => {
        if(err) throw err;
        if( result ){
            res.send(result);
        }else{
            Films.find({}, (err, films) => {
                if(err) throw err;
                client.setex('films', process.env.REDIS_EXP_TIME, JSON.stringify(films));
                res.json(films);
            })
        }
    })
});

router.get('/:name', (req, res, next) => {
    res.send('this is a single film');
});

module.exports = router;