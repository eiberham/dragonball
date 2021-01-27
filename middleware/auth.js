const mongoose = require("mongoose");

const User = mongoose.model("users");
const jwt = require("jsonwebtoken");

/**
 * The auth middleware.
 *
 * @param {*} req the http request
 * @param {*} res the http response
 * @param {*} next
 *
 * @returns {void}
 */
module.exports = (req, res, next) => {
    const token = req.headers["x-access-token"];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                res.status(400).json({
                    status: 400,
                    message: "Token expired"
                });
            } else {
                res.status(401).json({
                    status: 401,
                    message: "Unauthorized"
                });
            }
            return;
        }

        const { username } = decoded;

        User.findOne(
            {
                username: { $regex: new RegExp(`^${username}`, "i") }
            },
            (err, user) => {
                if (err) throw err;
                next();
            }
        );
    });
};
