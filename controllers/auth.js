const mongoose = require("mongoose");

const User = mongoose.model("users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    /**
     * Logs the user in.
     *
     * @param {*} username the username.
     * @param {*} password the password.
     * @returns {Promise} Promise object with the jwt of the authenticated user.
     */
    login: (username, password) => {
        return new Promise((resolve, reject) => {
            User.findOne(
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
                                        resolve({
                                            message: "Authenticated",
                                            token
                                        });
                                    }
                                );
                            }
                        });
                    } else {
                        reject("The user wasn't found.");
                    }
                }
            );
        });
    }
};
