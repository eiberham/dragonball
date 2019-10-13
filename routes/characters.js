const express = require('express');
const redis = require('redis');
const client = redis.createClient();
const router = express.Router();
const mongoose = require('mongoose');
const Characters = mongoose.model('characters');
const auth = require('../middleware/auth');
const { check, body, oneOf, validationResult } = require('express-validator');
const validate = require('../middleware/validate');

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
            Characters.findOne({'name': { $regex: new RegExp(`^${name}`, "i")}}, (err, character) => {
                if(err) throw err;
                client.setex(name, process.env.REDIS_EXP_TIME, JSON.stringify(character));
                res.json(character);
            });
        }
    });
});

router.post('/', [
    auth, 
    validate([
        body('name').isAlphanumeric(), 
        body('description').isString(),
        body('avatar').isString()
        .isURL()
    ])
], (req, res) => {
    const { 
        name, 
        description, 
        avatar 
    } = req.body;
    
    Characters.create({
        name,
        description,
        avatar
    }, function (err, character) {
        if (err) throw err;
        res.status(201)
        .json({
            message: 'Resource created'
        });
      });
});

router.patch("/:id", [
    auth, 
    validate([
        check('id').isAlphanumeric(),
    ]),
    oneOf([
        body('name').isString(),
        body('description').isString(),
        body('avatar').isURL()
    ])
], (req, res) => {
    try {
        validationResult(req).throw();
        const id = req.params.id;
        Characters.findOneAndUpdate({_id: id}, { ...req.body }, { upsert: true }, (err, character) => {
            if (err) throw err;
            res.status(200).json({
                message: "Resource updated"
            })
        });
    } catch (err) {
        res.status(422).json({
            message: err
        })
    }
});

router.delete("/:id", [
    auth, 
    validate([check('id').isAlphanumeric()])
], (req, res) => {
    const id = req.params.id;
    Characters.deleteOne({_id: id}, (err, character) => {
        if (err) throw err;
        res.status(200).json({
            message: "Resource deleted"
        });
    });
});

module.exports = router;