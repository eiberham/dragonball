
const redis = require("redis");
const config = require("../config");
const client = redis.createClient({ host: config.redis.host });
const mongoose = require("mongoose");

const Films = mongoose.model("films");

module.exports = {
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
        })
    },
    get: (name) => {
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
        })
    },
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
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            Films.deleteOne({ _id: id }, (err, film) => {
                if (err) reject(err);
                resolve({
                    message: "Resource deleted"
                });
            });
        })
    }
}