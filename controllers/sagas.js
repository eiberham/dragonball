const redis = require("redis");
const config = require("../config");

const client = redis.createClient({ host: config.redis.host });
const mongoose = require("mongoose");

const Sagas = mongoose.model("sagas");

module.exports = {
    /**
     * Gets all sagas.
     *
     * @returns {Promise} Promise containing all sagas.
     */
    getAll: () => {
        return new Promise((resolve, reject) => {
            client.get("sagas", (err, result) => {
                if (err) reject(err);
                if (result) {
                    resolve(JSON.parse(result));
                } else {
                    Sagas.find({}, (err, films) => {
                        if (err) throw err;
                        client.setex(
                            "sagas",
                            process.env.REDIS_EXP_TIME,
                            JSON.stringify(films)
                        );
                        resolve(films);
                    });
                }
            });
        });
    },
    /**
     * Gets a single saga by name.
     *
     * @param {string} name saga's name.
     * @returns {Promise} promise containing a single saga.
     */
    get: name => {
        return new Promise((resolve, reject) => {
            client.get(name, (err, result) => {
                if (err) reject(err);
                if (result) {
                    resolve(JSON.parse(result));
                } else {
                    Sagas.findOne(
                        { title: { $regex: new RegExp(`^${name}`, "i") } },
                        (err, film) => {
                            if (err) reject(err);
                            client.setex(
                                name,
                                process.env.REDIS_EXP_TIME,
                                JSON.stringify(film)
                            );
                            resolve(film);
                        }
                    );
                }
            });
        });
    },
    /**
     * Creates a saga.
     *
     * @param {string} name the saga's name.
     * @param {string} description the saga's description.
     * @param {string} image the saga's image.
     * @returns {Promise}
     */
    create: (name, description, image) => {
        return new Promise((resolve, reject) => {
            Sagas.create(
                {
                    name,
                    description,
                    image
                },
                (err, saga) => {
                    if (err) reject(err);
                    resolve({
                        message: "Resource created"
                    });
                }
            );
        });
    },
    /**
     * Deletes a saga.
     *
     * @param {number} id the saga's id.
     * @returns {Promise}
     */
    delete: id => {
        return new Promise((resolve, reject) => {
            Sagas.deleteOne({ _id: id }, (err, saga) => {
                if (err) reject(err);
                resolve({
                    message: "Resource deleted"
                });
            });
        });
    }
};
