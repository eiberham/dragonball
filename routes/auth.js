const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { 
    body, 
    sanitizeBody 
} = require('express-validator');

router.get('/', [ 
    body('user').not().isEmpty().trim().escape().exists(),
    body('password').not().isEmpty().trim().escape().exists(),
    sanitizeBody('notifyOnReply').toBoolean() 
], ( req, res ) => {
    
    const username = req.body.user;
    const password = req.body.password;

    User.findOne({
        'username': { $regex: new RegExp(`^${username}`, "i")}
    }, (err, user) => {
        if(err) throw err;

        const hash = user.password;

        bcrypt.compare(password, hash, (err, exists) => {
            if(err) throw err;
            if( exists ){
                const payload = { 
                    user: username, 
                    exp: Math.floor(Date.now() / 1000) + (60 * 60) 
                };
            
                jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
                    if(err) throw err;
                    res.status(200).json({
                        message: 'Authenticated',
                        token
                    })
                });
            }
        });

    });

});

module.exports = router;