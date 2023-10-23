const redis = require("redis");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../config");

const client = redis.createClient({ host: config.redis.host });

const Users = mongoose.model("users");

module.exports = {
    /**
     * Gets all users.
     *
     * @returns {Promise} Promise containing the users list.
     */
    getAll: () => {
        return new Promise((resolve, reject) => {
            client.get("users", (err, result) => {
                if (err) reject(err);
                if (result) {
                    resolve(JSON.parse(result));
                } else {
                    Users.find({}, (err, users) => {
                        if (err) reject(err);
                        client.setex(
                            "characters",
                            process.env.REDIS_EXP_TIME,
                            JSON.stringify(users)
                        );
                        resolve(users);
                    });
                }
            });
        });
    },
    /**
     * Gets a single user by name.
     *
     * @param {string} name the user name.
     * @returns {Promise} Promise containing the single user.
     */
    get: name => {
        return new Promise((resolve, reject) => {
            client.get(name, (err, result) => {
                if (err) reject(err);
                if (result) {
                    resolve(JSON.parse(result));
                } else {
                    Users.findOne(
                        { name: { $regex: new RegExp(`^${name}`, "i") } },
                        (err, user) => {
                            if (err) reject(err);
                            client.setex(
                                name,
                                process.env.REDIS_EXP_TIME,
                                JSON.stringify(user)
                            );
                            resolve(user);
                        }
                    );
                }
            });
        });
    },
    /**
     * Creates a user.
     *
     * @param username
     * @param password
     * @param {string} name the user name.
     * @param profile
     * @returns {Promise} Promise with message of resource created
     */
    create: (username, password, name, profile) => {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line no-shadow
            bcrypt.hash(password, 10).then(password => {
                Users.create(
                    {
                        username,
                        password,
                        name,
                        profile
                    },
                    (err, user) => {
                        if (err) reject(err);
                        resolve({
                            message: "Resource created"
                        });
                    }
                );
            });
        });
    },
    /**
     * Updates a user.
     *
     * @param {number} id the user id.
     * @param {object} body the user model's body.
     * @returns {Promise}
     */
    update: (id, body) => {
        return new Promise((resolve, reject) => {
            Users.findOneAndUpdate(
                { _id: id },
                { ...body },
                { upsert: true },
                (err, user) => {
                    if (err) reject(err);
                    resolve({
                        message: "Resource updated"
                    });
                }
            );
        });
    },
    /**
     * Deletes a user
     *
     * @param {number} id the user id.
     * @returns {Promise}
     */
    delete: id => {
        return new Promise((resolve, reject) => {
            Users.deleteOne({ _id: id }, (err, user) => {
                if (err) reject(err);
                resolve({
                    message: "Resource deleted"
                });
            });
        });
    }
};
