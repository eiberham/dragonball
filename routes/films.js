const express = require('express');
const redis = require('redis');
const config = require('../config');
const client = redis.createClient({host: config.redis.host || 'localhost'});
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

router.post('/', [
    auth, 
    validate([
        body('title').isAlphanumeric(), 
        body('description').isString(),
        body('movies').isArray().notEmpty(),
        body('cover').isString().isUrl()
    ])
], (req, res) => {
    const { 
        title, 
        description, 
        movies,
        cover 
    } = req.body;
    
    Films.create({
        title,
        description,
        movies,
        cover
    }, function (err, film) {
        if (err) throw err;
        res.status(201)
        .json({
            message: 'Resource created'
        });
      });
});

router.delete("/:id", [
    auth, 
    validate([check('id').isAlphanumeric()])
], (req, res) => {
    const id = req.params.id;
    Films.deleteOne({_id: id}, (err, film) => {
        if (err) throw err;
        res.status(200).json({
            message: "Resource deleted"
        });
    });
});

module.exports = router;