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
    getAll: async () => {
        try {
            const result = await client.get("users");
            if (result) return JSON.parse(result);
            return Users.find({}, (err, users) => {
                if (err) return err;
                client.setex(
                    "users",
                    process.env.REDIS_EXP_TIME,
                    JSON.stringify(users)
                );
                return users;
            });
        } catch (e) {
            return e;
        }
    },
    /**
     * Gets a single user by name.
     *
     * @param {string} name the user name.
     * @returns {Promise} Promise containing the single user.
     */
    get: async name => {
        try {
            const result = await client.get(name);
            if (result) return JSON.parse(result);
            const user = await Users.findOne({
                name: { $regex: new RegExp(`^${name}`, "i") }
            });
            return user;
        } catch (e) {
            return e;
        }
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
    create: async (username, password, name, profile) => {
        try {
            const hashed = await bcrypt.hash(password, 10);
            await Users.create({
                username,
                password: hashed,
                name,
                profile
            });
            return { message: "Resource created" };
        } catch (e) {
            return e;
        }
    },
    /**
     * Updates a user.
     *
     * @param {number} id the user id.
     * @param {object} body the user model's body.
     * @returns {Promise}
     */
    update: async (id, body) => {
        try {
            await Users.findOneAndUpdate(
                { _id: id },
                { ...body },
                { upsert: true }
            );
            return { message: "Resource updated" };
        } catch (e) {
            return e;
        }
    },
    /**
     * Deletes a user
     *
     * @param {number} id the user id.
     * @returns {Promise}
     */
    delete: async id => {
        try {
            await Users.deleteOne({ _id: id });
            return { message: "Resource deleted" };
        } catch (e) {
            return e;
        }
    }
};
