const redis = require("redis");
const mongoose = require("mongoose");
const config = require("../config");

const client = redis.createClient({ host: config.redis.host });

const Characters = mongoose.model("characters");

module.exports = {
    /**
     * Gets all the characters.
     *
     * @returns {Promise} Promise containing the characters list.
     */
    getAll: () => {
        return new Promise((resolve, reject) => {
            client.get("characters", (err, result) => {
                if (err) reject(err);
                if (result) {
                    resolve(JSON.parse(result));
                } else {
                    Characters.find({}, (err, characters) => {
                        if (err) reject(err);
                        client.setex(
                            "characters",
                            process.env.REDIS_EXP_TIME,
                            JSON.stringify(characters)
                        );
                        resolve(characters);
                    });
                }
            });
        });
    },
    /**
     * Gets a single character by name.
     *
     * @param {string} name the character name.
     * @returns {Promise} Promise containing the single character.
     */
    get: name => {
        return new Promise((resolve, reject) => {
            client.get(name, (err, result) => {
                if (err) reject(err);
                if (result) {
                    resolve(JSON.parse(result));
                } else {
                    Characters.findOne(
                        { name: { $regex: new RegExp(`^${name}`, "i") } },
                        (err, character) => {
                            if (err) reject(err);
                            client.setex(
                                name,
                                process.env.REDIS_EXP_TIME,
                                JSON.stringify(character)
                            );
                            resolve(character);
                        }
                    );
                }
            });
        });
    },
    /**
     * Creates a character.
     *
     * @param {string} name the character name.
     * @param {string} description the character description.
     * @param {string} avatar the characater's avatar.
     * @returns {Promise} Promise with message of resource created
     */
    create: (name, description, avatar) => {
        return new Promise((resolve, reject) => {
            Characters.create(
                {
                    name,
                    description,
                    avatar
                },
                (err, character) => {
                    if (err) reject(err);
                    resolve({
                        message: "Resource created"
                    });
                }
            );
        });
    },
    /**
     * Updates a character.
     *
     * @param {number} id the character's id.
     * @param {object} body the character model's body.
     * @returns {Promise}
     */
    update: (id, body) => {
        return new Promise((resolve, reject) => {
            Characters.findOneAndUpdate(
                { _id: id },
                { ...body },
                { upsert: true },
                (err, character) => {
                    if (err) reject(err);
                    resolve({
                        message: "Resource updated"
                    });
                }
            );
        });
    },
    /**
     * Deletes a character
     *
     * @param {number} id the character's id.
     * @returns {Promise}
     */
    delete: id => {
        return new Promise((resolve, reject) => {
            Characters.deleteOne({ _id: id }, (err, character) => {
                if (err) reject(err);
                resolve({
                    message: "Resource deleted"
                });
            });
        });
    }
};
