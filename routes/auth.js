const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', ( req, res ) => {
    
    const username = req.body.user;
    const password = req.body.password;

    User.findOne({
        'username': { $regex: new RegExp(`^${username}`, "i")}
    }, (err, user) => {
        if(err) throw err;

        const hash = user.password;

        bcrypt.compare(password, hash, function(err, exists) {
            if(err) throw err;
            if( exists ){
                const payload = { 
                    user: username, 
                    exp: Math.floor(Date.now() / 1000) + (60 * 60) 
                };
            
                jwt.sign(payload, 'secret', { algorithm: 'RS256' }, (err, token) => {
                    console.log("el token: ", token);
                    //res.send('cool');
                    if(err) throw err;
                    res.status(200).json({
                        code: 200,
                        message: 'Authenticated',
                        token
                    })
                });
            }
        });

    });

});

module.exports = router;