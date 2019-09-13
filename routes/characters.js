const express = require('express');
const redis = require('redis');
const client = redis.createClient();
const router = express.Router();
const mongoose = require('mongoose');
const Characters = mongoose.model('characters');

router.get('/', (req, res, next) => {
    client.get('characters', (err, result) => {
        if(err) throw err;
        if( result ){
            res.send(result);
        }else{
            Characters.find({}, (err, characters) => {
                if(err) throw err;
                client.setex('characters', process.env.REDIS_EXP_TIME, JSON.stringify(characters));
                res.json(characters);
            })
        }
    })

});

router.get('/:name', (req, res, next) => {
    const name = req.params.name;
    client.get(name, (err, result) => {
        if(err) throw err;
        if (result) {
            res.send(result);
        } else {
            Characters.find({'name': { $regex: new RegExp(`^${name}`, "i")}}, (err, character) => {
                if(err) throw err;
                client.setex(name, process.env.REDIS_EXP_TIME, JSON.stringify(character));
                res.json(character);
            });
        }
    });
});

module.exports = router;