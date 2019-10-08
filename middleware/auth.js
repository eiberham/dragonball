const mongoose = require('mongoose');
const User = mongoose.model('users');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
    const { username } = decoded;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if( err ) throw err;

        User.findOne({
            'username': { $regex: new RegExp(`^${username}`, "i")}
        }, (err, user) => {
            if( err ) throw err;

            if (decoded.exp <= Date.now()) {
                res.status(400).json({
                    "status": 400,
                    "message": "token expired"
                });
                return;
            }

            next();
        });
    });
}