const redis = require("redis");
const config = require("../config");

const client = redis.createClient({ host: config.redis.host });
const mongoose = require("mongoose");

const Films = mongoose.model("films");

module.exports = {
    /**
     * Gets all films.
     *
     * @returns {Promise} Promise containing all films.
     */
    getAll: () => {
        return new Promise((resolve, reject) => {
            client.get("films", (err, result) => {
                if (err) reject(err);
                if (result) {
                    resolve(JSON.parse(result));
                } else {
                    Films.find({}, (err, films) => {
                        if (err) throw err;
                        client.setex(
                            "films",
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
     * Gets a single film by name.
     *
     * @param {string} name film's name.
     * @returns {Promise} Promise containing a single film.
     */
    get: name => {
        return new Promise((resolve, reject) => {
            client.get(name, (err, result) => {
                if (err) reject(err);
                if (result) {
                    resolve(JSON.parse(result));
                } else {
                    Films.findOne(
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
     * Creates a film.
     *
     * @param {string} title film title.
     * @param {string} description film description.
     * @param {string} movies film movies.
     * @param {string} cover film cover.
     * @returns {Promise}
     */
    create: (title, description, movies, cover) => {
        return new Promise((resolve, reject) => {
            Films.create(
                {
                    title,
                    description,
                    movies,
                    cover
                },
                (err, film) => {
                    if (err) reject(err);
                    resolve({
                        message: "Resource created"
                    });
                }
            );
        });
    },
    /**
     * Deletes a film.
     *
     * @param {number} id
     * @returns {Promise}
     */
    delete: id => {
        return new Promise((resolve, reject) => {
            Films.deleteOne({ _id: id }, (err, film) => {
                if (err) reject(err);
                resolve({
                    message: "Resource deleted"
                });
            });
        });
    }
};
