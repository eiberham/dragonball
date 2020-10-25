const mongoose = require("mongoose");

const User = mongoose.model("users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    authUser: (username, password) => {
        return User.findOne(
            {
                username: { $regex: new RegExp(`^${username}`, "i") }
            },
            (err, user) => {
                if (err) throw err;

                if (user) {
                    const hash = user.password;

                    bcrypt.compare(password, hash, (err, exists) => {
                        if (err) throw err;
                        if (exists) {
                            const payload = {
                                user: username
                            };

                            jwt.sign(
                                payload,
                                process.env.JWT_SECRET,
                                { expiresIn: "1h" },
                                (err, token) => {
                                    if (err) throw err;
                                    return {
                                        message: "Authenticated",
                                        token
                                    };
                                }
                            );
                        }
                    });
                } else {
                    throw new Error('The user wasn\'t found.')
                }
            }
    },
}